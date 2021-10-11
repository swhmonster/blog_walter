## lambda实现原理
>Lambda表达式是Java8中最令人激动的特性，它与匿名内部类看起来有很多相似之处，但Lambda表达式并不是简单地被转为了匿名类。
- Lambda表达式声明的地方会生成一个invokedynamic指令，同时编译器生成一个对应的引导方法（Bootstrap Method）。
- 第一次执行invokedynamic指令时，会调用对应的引导方法（Bootstrap Method），该引导方法会调用LambdaMetafactory.metafactory方法动态生成内部类。
- 引导方法会返回一个动态调用CallSite对象，这个CallSite会最终调用实现了Runnable接口的内部类。
- Lambda表达式中的内容会被编译成静态方法，前面动态生成的内部类会直接调用该静态方法。
- 真正执行lambda调用的还是用invokeinterface指令。

为什么Java 8的Lambda表达式要基于invokedynamic指令来实现呢？Oracle的开发者专门写了一篇文章介绍了Java 8Lambda设计时的考虑以及实现方法。文中提到Lambda表达式可以通过内部类、method handle、dynamic proxies等方式实现，但是这些方法各有优劣。实现Lambda表达式需要达成两个目标，为未来的优化提供最大的灵活性，且能保持类文件字节码格式的稳定。使用invokedynamic可以很好地兼顾这两个目标。invokedynamic与之前四个invoke指令最大的不同就在于它把方法分派的逻辑从虚拟机层面下放到程序语言。

Lambda表达式采用的方式并不是在编译期间生成匿名内部类，而是提供一个稳定的字节码二进制表示规范，对用户而言看到的只有invokedynamic这样一个非常简单的指令。用invokedynamic来实现把方法翻译的逻辑隐藏在JDK的实现中，后续想替换实现方式非常简单，只用修改LambdaMetafactory.metafactory里面的逻辑就可以了。这种方法把Lambda翻译的策略由编译期间推迟到运行时，未来的JDK会怎样实现Lambda表达式可能还会有变化。

- LambdaMetafactory.metafactory
```java
public static CallSite metafactory(MethodHandles.Lookup caller,
                                       String invokedName,
                                       MethodType invokedType,
                                       MethodType samMethodType,
                                       MethodHandle implMethod,
                                       MethodType instantiatedMethodType)
            throws LambdaConversionException {
        AbstractValidatingLambdaMetafactory mf;
        // 生成新的内部类
        mf = new InnerClassLambdaMetafactory(caller, invokedType,
                                             invokedName, samMethodType,
                                             implMethod, instantiatedMethodType,
                                             false, EMPTY_CLASS_ARRAY, EMPTY_MT_ARRAY);
        mf.validateMetafactoryArgs();
        return mf.buildCallSite();
    }
```

- InnerClassLambdaMetafactory
```java
public InnerClassLambdaMetafactory(MethodHandles.Lookup caller,
                                       MethodType invokedType,
                                       String samMethodName,
                                       MethodType samMethodType,
                                       MethodHandle implMethod,
                                       MethodType instantiatedMethodType,
                                       boolean isSerializable,
                                       Class<?>[] markerInterfaces,
                                       MethodType[] additionalBridges)
            throws LambdaConversionException {
        super(caller, invokedType, samMethodName, samMethodType,
              implMethod, instantiatedMethodType,
              isSerializable, markerInterfaces, additionalBridges);
        implMethodClassName = implClass.getName().replace('.', '/');
        implMethodName = implInfo.getName();
        implMethodDesc = implInfo.getMethodType().toMethodDescriptorString();
        
        // 关注这一段代码
        constructorType = invokedType.changeReturnType(Void.TYPE);
        lambdaClassName = targetClass.getName().replace('.', '/') + "$$Lambda$" + counter.incrementAndGet();
        cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
        // 关注这一段代码
        
        int parameterCount = invokedType.parameterCount();
        if (parameterCount > 0) {
            argNames = new String[parameterCount];
            argDescs = new String[parameterCount];
            for (int i = 0; i < parameterCount; i++) {
                argNames[i] = "arg$" + (i + 1);
                argDescs[i] = BytecodeDescriptor.unparse(invokedType.parameterType(i));
            }
        } else {
            argNames = argDescs = EMPTY_STRING_ARRAY;
        }
    }
```

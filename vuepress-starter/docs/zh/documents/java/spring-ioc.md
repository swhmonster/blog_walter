# Spring依赖注入方式，为什么Spring4.0提倡使用构造函数注入方式？
## 先回答题目中的问题：
Spring 团队提倡使用基于构造方法的注入，因为这样一方面可以将依赖注入到一个不可变的变量中 (注：final 修饰的变量) ，另一方面也可以保证这些变量的值不会是 null 。此外，经过构造方法完成依赖注入的组件 (注：比如各个 service)，在被调用时可以保证它们都完全准备好了 。与此同时，从代码质量的角度来看，一个巨大的构造方法通常代表着出现了代码异味，这个类可能承担了过多的责任 。

## 基于构造函数或基于setter的DI？
- 何时使用构造注入，何时使用setter注入，经验法则是:强制依赖用构造，可选依赖用Setter。注意，在setter方法上使用@Required注解即可令属性强制依赖。
- Spring 团队建议,构造注入的实例是不可变的，不为null的。此外，构造注入组件要将完全初始化后的实例返回给客户端代码。还有，大量参数的构造函数是非常烂的，它意味着该类有大量的职责，得重构。
- setter注入主要用于可选依赖,类内部可以指定默认依赖。否则类内所有使用依赖的地方，都得进行非空校验。setter注入的有个好处就是，类可以重配置或者再注入。因此，使用JMXMBeans进行管理的场景中，就非常适合setter注入。
- 使用何种依赖注入方式，对于某些类，非常有意义。有时协同第三方类处理，没有源码，由你来决定使用何种方式。比如，第三方类未暴露任何setter方法，那么构造注入也许就是唯一的可行的注入方式了。

## 官网原文：

Constructor-based or setter-based DI?

Since you can mix constructor-based and setter-based DI, it is a good rule of thumb to use constructors formandatory dependenciesand setter methods or configuration methods foroptional dependencies. Note that use of the@Requiredannotation on a setter method can be used to make the property a required dependency.

The Spring team generally advocates constructor injection as it enables one to implement application components asimmutable objectsand to ensure that required dependencies are notnull. Furthermore constructor-injected components are always returned to client (calling) code in a fully initialized state. As a side note, a large number of constructor arguments is abad code smell, implying that the class likely has too many responsibilities and should be refactored to better address proper separation of concerns.

Setter injection should primarily only be used for optional dependencies that can be assigned reasonable default values within the class. Otherwise, not-null checks must be performed everywhere the code uses the dependency. One benefit of setter injection is that setter methods make objects of that class amenable to reconfiguration or re-injection later. Management throughJMX MBeansis therefore a compelling use case for setter injection.

Use the DI style that makes the most sense for a particular class. Sometimes, when dealing with third-party classes for which you do not have the source, the choice is made for you. For example, if a third-party class does not expose any setter methods, then constructor injection may be the only available form of DI.



## 下面详细讲述下依赖注入：

依赖注入（DI）是一个过程，通过这个过程，对象定义它们的依赖关系，即它们使用的其他对象，只能通过构造函数参数，工厂方法的参数或在构造或返回对象实例后在对象实例上设置的属性。从工厂方法。然后容器在创建bean时注入这些依赖项。这个过程基本上是反向的，因此名称Inversion of Control（IoC），bean本身通过使用类的直接构造或服务定位器模式来控制其依赖项的实例化或位置。

使用DI原理的代码更清晰，当对象提供其依赖项时，解耦更有效。该对象不查找其依赖项，也不知道依赖项的位置或类。因此，您的类变得更容易测试，特别是当依赖关系在接口或抽象基类上时，这允许在单元测试中使用存根或模拟实现。

DI存在两个主要变体，基于构造函数的依赖注入和基于Setter的依赖注入。

基于构造函数的依赖注入

基于构造函数的DI由容器调用具有多个参数的构造函数来完成，每个参数表示一个依赖项。调用static具有特定参数的工厂方法来构造bean几乎是等效的，本讨论同样处理构造函数和static工厂方法的参数。以下示例显示了一个只能通过构造函数注入进行依赖注入的类。请注意，此类没有什么特别之处，它是一个POJO，它不依赖于容器特定的接口，基类或注释。
```java
public  class SimpleMovieLister {

    // SimpleMovieLister依赖于MovieFinder 
    私有 MovieFinder movieFinder;

    //一个构造函数，以便Spring容器可以注入一个MovieFinder 
    public SimpleMovieLister（MovieFinder movieFinder）{
         this .movi​​eFinder = movieFinder;
    }

    //省略了实际使用注入的MovieFinder的业务逻辑... 
```

## 构造函数参数解析

使用参数的类型进行构造函数参数解析匹配。如果bean定义的构造函数参数中不存在潜在的歧义，那么在bean定义中定义构造函数参数的顺序是在实例化bean时将这些参数提供给适当的构造函数的顺序。

```java
package x.y;

public class Foo {

    public Foo(Bar bar, Baz baz) {
        // ...
    }
}
```

假设Bar并且Baz类与继承无关，则不存在潜在的歧义。因此，以下配置工作正常，您不需要在<constructor-arg/>元素中显式指定构造函数参数索引和/或类型。

```xml
<beans>
    <bean id="foo" class="x.y.Foo">
        <constructor-arg ref="bar"/>
        <constructor-arg ref="baz"/>
    </bean>

    <bean id="bar" class="x.y.Bar"/>

    <bean id="baz" class="x.y.Baz"/>
</beans>
```

当引用另一个bean时，类型是已知的，并且可以进行匹配（与前面的示例一样）。当使用简单类型时，例如<value>true</value>，Spring无法确定值的类型，因此无法在没有帮助的情况下按类型进行匹配。

```java
package examples;

public class ExampleBean {

    // Number of years to calculate the Ultimate Answer
    private int years;

    // The Answer to Life, the Universe, and Everything
    private String ultimateAnswer;

    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

在前面的场景中，如果使用属性显式指定构造函数参数的类型，则容器可以使用与简单类型匹配的类型type。

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

使用该index属性显式指定构造函数参数的索引。

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

除了解决多个简单值的歧义之外，指定索引还可以解决构造函数具有相同类型的两个参数的歧义。请注意，索引基于0。

您还可以使用构造函数参数名称进行值消歧：

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```

请记住，要使这项工作开箱即用，必须在启用调试标志的情况下编译代码，以便Spring可以从构造函数中查找参数名称。如果无法使用debug标志编译代码（或者不希望），则可以使用@ConstructorPropertiesJDK批注显式命名构造函数参数。然后，示例类必须如下所示：

```java
package examples;

public class ExampleBean {

    // Fields omitted

    @ConstructorProperties({"years", "ultimateAnswer"})
    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

基于Setter的依赖注入

基于setter的DI是在调用无参数构造函数或无参数static工厂方法来实例化bean之后，通过容器调用bean上的setter方法来完成的。

以下示例显示了一个只能使用纯setter注入进行依赖注入的类。这个类是传统的Java。它是一个POJO，它不依赖于容器特定的接口，基类或注释。

```java
public  class SimpleMovieLister {

    // SimpleMovieLister依赖于MovieFinder 
    私有 MovieFinder movieFinder;

    //一个setter方法，以便Spring容器可以注入一个MovieFinder 
    public  void setMovieFinder（MovieFinder movieFinder）{
         this .movi​​eFinder = movieFinder;
    }

    //省略了实际使用注入的MovieFinder的业务逻辑... 
}
```

该ApplicationContext支架构造和基于setter方法的DI为它所管理的豆类。在通过构造函数方法注入了一些依赖项之后，它还支持基于setter的DI。您可以以a的形式配置依赖项，并将BeanDefinition其与PropertyEditor实例结合使用，以将属性从一种格式转换为另一种格式。然而，大多数Spring用户不直接与这些类（即，编程），而是用XMLbean定义，注释组件（即与注释类@Component，@Controller等等），或@Bean在基于Java的方法@Configuration类。然后，这些源在内部转换为实例BeanDefinition并用于加载整个Spring IoC容器实例。



Spring官网原文地址：https://docs.spring.io/spring/docs/4.3.20.RELEASE/spring-framework-reference/htmlsingle/#beans-constructor-injection

# Spring dependency injection method, why does Spring 4.0 advocate using constructor injection method?
## First answer the question in the question:
The Spring team advocates the use of construction based injection, as it allows for dependency injection into an immutable variable (note: final modified variable) and ensures that the values of these variables are not null. In addition, components (such as various services) that have undergone dependency injection through construction methods can be guaranteed to be fully prepared when called. At the same time, from the perspective of code quality, a huge constructor usually means that there is a code smell, and this class may bear too much responsibility.

## Constructor based or setter based DI?
- When to use construct injection and when to use setter injection, the rule of thumb is: use construct for mandatory dependencies, and use setter for optional dependencies. Note that using the @ Required annotation on the setter method can force a dependency on the property.
- The Spring team suggests that constructing injected instances is immutable and not null. In addition, constructing injection components requires returning fully initialized instances to client code. Also, constructors with a large number of parameters are very bad, which means that the class has a lot of responsibilities and needs to be refactored.
- Setter injection is mainly used for optional dependencies, and default dependencies can be specified within the class. Otherwise, all places within the class that use dependencies must undergo non null validation. One advantage of setter injection is that classes can be reconfigured or re injected. Therefore, in scenarios where JMXMBeans is used for management, it is very suitable for setter injection.
- The use of dependency injection methods is very meaningful for certain classes. Sometimes it's up to you to decide which method to use when collaborating with third-party classes without source code. For example, if a third-party class does not expose any setter methods, then constructing injection may be the only feasible injection method.

## Original text of official website:

Constructor-based or setter-based DI?

Since you can mix constructor-based and setter-based DI, it is a good rule of thumb to use constructors formandatory dependenciesand setter methods or configuration methods foroptional dependencies. Note that use of the@Requiredannotation on a setter method can be used to make the property a required dependency.

The Spring team generally advocates constructor injection as it enables one to implement application components asimmutable objectsand to ensure that required dependencies are notnull. Furthermore constructor-injected components are always returned to client (calling) code in a fully initialized state. As a side note, a large number of constructor arguments is abad code smell, implying that the class likely has too many responsibilities and should be refactored to better address proper separation of concerns.

Setter injection should primarily only be used for optional dependencies that can be assigned reasonable default values within the class. Otherwise, not-null checks must be performed everywhere the code uses the dependency. One benefit of setter injection is that setter methods make objects of that class amenable to reconfiguration or re-injection later. Management throughJMX MBeansis therefore a compelling use case for setter injection.

Use the DI style that makes the most sense for a particular class. Sometimes, when dealing with third-party classes for which you do not have the source, the choice is made for you. For example, if a third-party class does not expose any setter methods, then constructor injection may be the only available form of DI.



## Below is a detailed description of dependency injection:

Dependency injection (DI) is a process through which objects define their dependencies, that is, other objects they use can only be set on the object instance through constructor parameters, factory method parameters, or properties set on the object instance after constructing or returning it. From the factory method. Then the container injects these dependencies when creating the bean. This process is essentially reverse, hence the name Inversion of Control (IoC), where the bean itself controls the instantiation or placement of its dependencies through the use of direct class construction or service locator patterns.

The code using the DI principle is clearer, and decoupling is more effective when an object provides its dependencies. The object does not search for its dependencies, nor does it know the location or class of the dependencies. Therefore, your class becomes easier to test, especially when dependencies are on interfaces or abstract base classes, which allows for the use of stubs or mock implementations in unit testing.

There are two main variants of DI, constructor based dependency injection and setter based dependency injection.

Dependency Injection Based on Constructor

Constructor based DI is completed by the container calling a constructor with multiple parameters, each representing a dependency. Calling static factory methods with specific parameters to construct beans is almost equivalent, and this discussion also addresses the parameters of constructors and static factory methods. The following example shows a class that can only be dependency injected through constructor injection. Please note that there is nothing special about this class. It is a POJO that does not rely on container specific interfaces, base classes, or annotations.
```java
public  class SimpleMovieLister {

    // SimpleMovieLister relies on MovieFinder
    私有 MovieFinder movieFinder;

    // A constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister（MovieFinder movieFinder）{
         this.movi​​eFinder = movieFinder;
    }

    // Omitted the business logic of actually using injected MovieFinder... 
```

## Constructor parameter parsing

Use the type of the parameter for constructor parameter parsing and matching. If there is no potential ambiguity in the constructor parameters defined by the bean, the order in which the constructor parameters are defined in the bean definition is the order in which they are provided to the appropriate constructor when instantiating the bean.

```java
package x.y;

public class Foo {

    public Foo(Bar bar, Baz baz) {
        // ...
    }
}
```

Assuming that Bar and Baz classes are independent of inheritance, there is no potential ambiguity. Therefore, the following configuration works properly and you do not need to explicitly specify the constructor parameter index and/or type in the<constructor arg/>element.

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

When referencing another bean, the type is known and can be matched (as in the previous example). When using simple types, such as<value>true</value>, Spring cannot determine the type of the value and therefore cannot match by type without assistance.

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

In the previous scenario, if the type of the constructor parameter is explicitly specified using attributes, the container can use a type type that matches the simple type.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

Use the index attribute to explicitly specify the index of the constructor parameter.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

In addition to resolving ambiguity between multiple simple values, specifying an index can also resolve ambiguity between two parameters of the same type in a constructor. Please note that the index is based on 0.

You can also use constructor parameter names for value disambiguation:

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```

Please remember that for this work to be out of the box, the code must be compiled with debugging flags enabled so that Spring can look up parameter names from the constructor. If you cannot compile code with the debug flag (or do not want it), you can use the @ ConstructorPropertiesJDK annotation to explicitly name the constructor parameters. Then, the example class must look like this:

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

Setter based dependency injection

Setter based DI is achieved by calling the setter method on the bean through a container after instantiating the bean by calling the parameterless constructor or parameterless static factory method.

The following example shows a class that can only use pure setter injection for dependency injection. This class is traditional Java. It is a POJO that does not rely on container specific interfaces, base classes, or annotations.

```java
public  class SimpleMovieLister {

    // SimpleMovieLister rely  on MovieFinder 
    private MovieFinder movieFinder;

    // A constructor so that the Spring container can inject a MovieFinder
    public  void setMovieFinder（MovieFinder movieFinder）{
         this.movi​​eFinder = movieFinder;
    }

    //Omitted the business logic of actually using injected MovieFinder... 
}
```

The Application Context framework is constructed and DI based on the setter method is used to manage the beans it manages. After injecting some dependencies through the constructor method, it also supports setter based DI. You can configure dependencies in the form of a and use BeanDefinition with a PropertyEditor instance to convert properties from one format to another. However, most Spring users do not directly interact with these classes (i.e. programming), but instead use XML beans to define, annotate components (i.e. with annotation classes @ Component, @ Controller, etc.), or @ beans in Java based methods @ Configuration classes. Then, these sources are internally converted into instance BeanDefinition and used to load the entire Spring IoC container instance.



Spring official website original address：https://docs.spring.io/spring/docs/4.3.20.RELEASE/spring-framework-reference/htmlsingle/#beans-constructor-injection

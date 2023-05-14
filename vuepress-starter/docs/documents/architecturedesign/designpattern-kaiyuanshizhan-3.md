# Learn functional programming in three programming paradigms with Google Guava
Now there are three main programming paradigms: process oriented, object-oriented and functional programming. In the theoretical section, we have already discussed the first two in detail. Today, let's take the opportunity to talk about the rest, functional programming.

Functional programming is not a new thing, it has appeared more than 50 years ago. In recent years, functional programming has attracted more and more attention, and many new functional programming languages have emerged, such as Clojure, Scala, Erlang, etc. Some non functional programming languages also add many features, syntax, and class libraries to support functional programming, such as Java, Python, Ruby, JavaScript, and so on. In addition, Google Guava has enhanced functional programming.

Because of the particularity of functional programming, it can only play its advantages in scientific computing, data processing, statistical analysis and other fields. Therefore, I personally feel that it can not completely replace the more general object-oriented programming paradigm. However, as a supplement, it also has great significance in existence, development, and learning. So, I think it's necessary to take you to learn together in the column.
## What exactly is functional programming?
The English translation of functional programming is Functional Programming. So what exactly is functional programming?

Process oriented and object oriented programming do not have strict official definitions. In the explanation at that time, I only provided my own summary of the definition. Moreover, the definition given at that time was only a summary of the main characteristics of the two paradigms and was not very strict. In fact, functional programming is the same, and there is no strict official definition. So, next, I will tell you what functional programming is from the characteristics.

Strictly speaking, "function" in functional programming does not refer to the concept of "function" in our programming language, but refers to mathematical "function" or "expression" (for example, y=f (x)). However, in programming implementation, we generally habitually design mathematical "functions" or "expressions" as functions. Therefore, if we don't go deep into it, "function" in functional programming can also be understood as "function" in programming language.

Each programming paradigm has its own unique aspect, which is why they are abstracted as a paradigm. The biggest feature of object-oriented programming is that it organizes code using classes and objects as units, as well as its four major characteristics. The biggest characteristic of process oriented programming is that it uses functions as the unit for organizing code, and separates data and methods. What is the most unique aspect of functional programming?

In fact, the most unique feature of functional programming is its programming idea. Functional programming believes that a program can be represented by a combination of a series of mathematical functions or expressions. Functional programming is a lower level abstraction of the program oriented to mathematics, which describes the calculation process as an expression. However, in this way, you will definitely have questions. Can any program really be represented as a set of mathematical expressions?

In theory, it is possible. However, not all programs are suitable for doing so. Functional programming has its own application scenarios, such as scientific computing, data processing, statistical analysis, etc. mentioned at the beginning. In these fields, programs are often easier to express in mathematical expressions. Compared with non functional programming, functional programming can achieve the same function with very little code. However, for the development of large-scale business systems with strong business relevance, it is obviously asking for trouble to abstract them into mathematical expressions and insist on functional programming. On the contrary, in this application scenario, object-oriented programming is more suitable, and the code written is more readable and maintainable.

What I just mentioned is the programming idea of functional programming. If we are specific to programming implementation, functional programming, like process oriented programming, also uses functions as the unit of code organization. However, the difference between it and procedural programming is that its functions are stateless. What is stateless? Simply put, the variables involved in a function are all local variables, and they do not share class member variables like object-oriented programming, nor do they share global variables like procedural programming. The execution result of a function is only related to the input parameters and is not related to any other external variables. The same input parameter, no matter how executed, yields the same result. This is actually the basic requirement for mathematical functions or expressions. Let me give an example to briefly explain.
```java
// State function: The execution result depends on the value of b, even if the input parameters are the same. Multiple executions of the function may result in different return values because the value of b may be different.
int b;
int increase(int a) {
  return a + b;
}

// Stateless function: The execution result does not depend on any external variable value. As long as the input parameters are the same, no matter how many times the function is executed, the return value of the function is the same
int increase(int a, int b) {
  return a + b;
}
```
To summarize, different programming paradigms are not completely different, and there are always some identical programming rules. For example, whether it is process oriented, object-oriented or functional programming, they all have the concept of variables and functions, and the top level must have a main function execution entry to assemble programming units (classes, functions, etc.). However, the object-oriented programming unit is a class or object, the process oriented programming unit is a function, and the functional programming programming unit is a stateless function.
## Java support for functional programming
As we mentioned earlier, it is not necessary to use an object-oriented programming language to implement object-oriented programming, and similarly, it is not necessary to use a functional programming language to implement functional programming. Now, many object-oriented programming languages also provide corresponding syntax and class libraries to support functional programming.

Next, let's take a look at Java, an object-oriented programming language, and its support for functional programming to deepen your understanding of functional programming. Let's take a look at the following typical Java functional programming code.
```java
public class FPDemo {
  public static void main(String[] args) {
    Optional<Integer> result = Stream.of("f", "ba", "hello")
            .map(s -> s.length())
            .filter(l -> l <= 3)
            .max((o1, o2) -> o1-o2);
    System.out.println(result.get()); // output2
  }
}
```
The purpose of this code is to filter out strings with a length of less than or equal to 3 from a set of string arrays and find the maximum length among them.

If you don't understand the syntax of Java functional programming, you may be confused after reading the above code. The main reason is that Java has introduced three new syntax concepts for functional programming: Stream class, Lambda expression and Functional Interface. The Stream class is used to support the code writing method of cascading multiple function operations through '.'; The purpose of introducing Lambda expressions is to simplify code writing; The function interface allows us to wrap functions into function interfaces to use functions as parameters (Java does not support function pointer like C, and can use functions directly as parameters).

**Firstly, let's take a look at the Stream class**

Suppose we want to calculate an expression: (3-1) * 2+5. If written in the usual way of function calls, it would look like this:
```java
add(multiply(subtract(3,1),2),5);
```
However, writing code like this may seem difficult to understand, so let's switch to a more readable writing method as follows:
```java
subtract(3,1).multiply(2).add(5);
```
We know that in Java, '.' represents a method that calls an object. To support the cascading call method mentioned above, we have each function return a common type: Stream class object. There are two types of operations on the Stream class: intermediate operations and termination operations. The intermediate operation still returns a Stream class object, while the termination operation returns a determined value result.

Let's take a look at the previous example again. I have provided comments and explanations for the code, as shown below. Among them, map and filter are intermediate operations that return Stream class objects and can continue cascading other operations; Max is a termination operation, and the returned object is not a Stream class object. It cannot continue cascading further.
```java
public class FPDemo {
  public static void main(String[] args) {
    Optional<Integer> result = Stream.of("f", "ba", "hello") // Of returns a Stream<String>object
            .map(s -> s.length()) // Map returns a Stream<Integer>object
            .filter(l -> l <= 3) // Filter returns a Stream<Integer>object
            .max((o1, o2) -> o1-o2); // Max termination operation: returns Optional<Integer>
    System.out.println(result.get()); // Output 2
  }
}
```
**Secondly, let's take a look at Lambda expressions**

As we mentioned earlier, the main purpose of introducing Lambda expressions in Java is to simplify code writing. In fact, we can also write the code in the example without using Lambda expressions. Let's take the map function as an example to illustrate.

There are three sections of code below. The first section shows the definition of the map function. In fact, the parameters received by the map function are a Function interface, which will be discussed later. The second section of code shows the usage of the map function. The third section of code is written in a simplified Lambda expression for the second section. In fact, lambda expressions in Java are just a syntactic sugar, and the bottom layer is implemented based on function interfaces, which is the writing method shown in the second section of code.
```java
// Definition of map function in Stream:
public interface Stream<T> extends BaseStream<T, Stream<T>> {
  <R> Stream<R> map(Function<? super T, ? extends R> mapper);
  //... Omit other functions
}

// Usage of map in Stream:
Stream.of("fo", "bar", "hello").map(new Function<String, Integer>() {
  @Override
  public Integer apply(String s) {
    return s.length();
  }
});

// Simplified writing method using Lambda expression:
Stream.of("fo", "bar", "hello").map(s -> s.length());
```
Lambda expression syntax is not the focus of our learning. I will only briefly introduce it here. If you are interested, you can delve deeper into it yourself.

Lambda expressions consist of three parts: input, function body, and output. If expressed, it looks like this:
```java
(a, b) -> {Statement 1; Statement 2;...; return Output;}//a, where b is the input parameter
```
In fact, the writing of Lambda expressions is very flexible. What we just provided is the standard writing method, and there are many simplified writing methods. For example, if there is only one input parameter, () can be omitted and written directly as a ->{...}; If there are no input parameters, you can simply omit both the input and arrows, leaving only the function body; If the function body has only one statement, {} can be omitted; If the function does not return a value, the return statement can be ignored.

If we replace all the Lambda expressions in the previous example with the implementation of the function interface, it will look like this. Is there a lot more code?
```java
Optional<Integer> result = Stream.of("f", "ba", "hello")
        .map(s -> s.length())
        .filter(l -> l <= 3)
        .max((o1, o2) -> o1-o2);
        
// The implementation method of restoring to a function interface
Optional<Integer> result2 = Stream.of("fo", "bar", "hello")
        .map(new Function<String, Integer>() {
          @Override
          public Integer apply(String s) {
            return s.length();
          }
        })
        .filter(new Predicate<Integer>() {
          @Override
          public boolean test(Integer l) {
            return l <= 3;
          }
        })
        .max(new Comparator<Integer>() {
          @Override
          public int compare(Integer o1, Integer o2) {
            return o1 - o2;
          }
        });
```
**Finally, let's take a look at the function interface**

In fact, the Function, Predict, and Comparator in the above code are all function interfaces. As we know, C language supports function pointer, which can directly use functions as variables. However, Java has no syntax like function pointer. So, it wraps the function in the interface through a function interface and uses it as a variable.

In fact, a function interface is an interface. However, it also has its own unique feature, which is the requirement to include only one unimplemented method. Because only in this way can Lambda expressions clearly know which interface is being matched. If there are two unimplemented methods and the interface input parameters and return values are the same, then Java does not know which method the expression corresponds to when translating Lambda expressions.

I have copied and pasted the source code of the Function and Predict function interfaces provided by Java below. You can compare them and understand my explanation of the function interfaces just now.
```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);  // Only this unimplemented method

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }
}

@FunctionalInterface
public interface Predicate<T> {
    boolean test(T t); // Only this unimplemented method

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```
The above is Java's syntax support for functional programming. I think you can easily understand the example of functional programming given at the beginning, right?

## Guava's Enhancements to functional programming
If you are the designer of Google Guava, what else can Google Guava do for Java functional programming?

Disruptive innovation is difficult. However, we can make some additions. On the one hand, we can add operations on the Stream class (termination operations such as map, filter, max, and intermediate operations), and on the other hand, we can also add more function interfaces (function interfaces such as Function and Predicate). In fact, we can also design new classes that support cascading operations similar to Stream classes. In this way, it will be more convenient to use Java and Guava for functional programming.

However, contrary to our expectations, Google Guava does not provide much support for functional programming, but only encapsulates several interfaces for traversing set operations. The code is as follows:
```java
Iterables.transform(Iterable, Function);
Iterators.transform(Iterator, Function);
Collections.transfrom(Collection, Function);
Lists.transform(List, Function);
Maps.transformValues(Map, Function);
Multimaps.transformValues(Mltimap, Function);
...
Iterables.filter(Iterable, Predicate);
Iterators.filter(Iterator, Predicate);
Collections2.filter(Collection, Predicate);
...
```
From Google Guava's GitHub Wiki, we find that Google is very cautious about the use of functional programming. It believes that excessive use of functional programming will lead to poor code readability, and emphasizes not to abuse it. This is consistent with my previous view on functional programming. Therefore, Google Guava does not provide much support for functional programming.

The optimization of traversal set operation is mainly because an important application scenario of functional programming is traversal set. If we don't use functional programming, we can only use the for loop to process the data in the collection one by one. Using functional programming can greatly simplify the code writing of traversing set operations. One line of code can solve the problem, and there is not much loss in readability.
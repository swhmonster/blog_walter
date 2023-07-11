## CompletableFuture underlying implementation and usage details
### CompletableFuture underlying implementation
The underlying implementation of CompleteFuture uses a callback and event driven approach to implement asynchronous operations. In CompleteFuture, each asynchronous operation is an independent task, and when the task is completed, the corresponding callback function will be triggered to handle the result or exception.

Specifically, the underlying implementation of CompleteFuture includes the following key components:
- CompletionStage

  The CompletionStage interface is the fundamental interface of CompleteFuture, which defines the basic methods and states of asynchronous operations. CompleteFuture implements the CompletionStage interface and extends more functions on this basis.
- Executor

  Executor is a Thread pool for executing asynchronous operations. CompleteFuture controls concurrency and execution order through Executor. By default, CompleteFuture uses the ForkJoinPool. commonPool() Thread pool, or you can customize the Thread pool by specifying the Executor.
- Completion

  Completion is the core component used internally in CompleteFuture to implement asynchronous operations, encapsulating the state and callback functions of asynchronous operations. Each Completion object contains an input value and an output value. When the input value is available, a callback function will be triggered and a new Completion object will be generated. In this way, CompleteFuture implements chain calls and combinations of asynchronous operations.
- ForkJoinTask 

  ForkJoinTask is a framework used to implement Task parallelism in Java. CompletedFuture uses ForkJoinTask to implement concurrent processing and execution of asynchronous operations. Each CompleteableFuture task will be converted into a ForkJoinTask, and then submitted to the Thread pool for execution.

- In summary, the underlying implementation of CompleteFuture adopts a callback and event driven approach to achieve asynchronous operations, utilizing core components such as Completion, Executor, and ForkJoinTask to achieve concurrent processing and execution of tasks. This implementation method makes CompleteFuture efficient, flexible, and scalable, which can meet the needs of various asynchronous programming scenarios.
### CompleteFuture Usage Details
Here is a detailed explanation of CompleteFuture:
#### Creation of CompleteFuture
CompletedFuture can be created through the static Factory method pattern. The common methods are as follows:
- CompleteFuture. supplyAsync(): used to asynchronously execute a task with a return value;
- CompleteFuture. runAsync(): used to asynchronously execute a task without a return value;
- CompleteableFuture. completedFuture(): Used to create a completed CompleteableFuture object.
#### Combination of CompleteFuture
CompleteFuture provides a very powerful combination function, which can combine multiple CompleteFuture objects for execution. The commonly used combination methods include the following:
- ThenApply (Function<? Super T,? Extends U>fn): used to convert the results of one CompleteFuture object to the results of another CompleteFuture object;
- ThenAccept (Consumer<? Super T>action): used to consume the results of CompleteFuture;
- ThenRun (Runnable action): used to execute a Runnable object after the CompleteFuture is completed;
- ThenCombine (CompletionStage<? Extends U>other, BiFunction<? Super T,? Super U,? Extends V>fn): used to combine the results of two CompleteableFuture objects;
- ThenCompose (Function<? Super T,? Extends CompletionStage>fn): Used to take the result of one CompleteFuture object as input to the next CompleteFuture object.
#### Exception handling for CompleteFuture
CompleteFuture provides very flexible exception handling capabilities, which can be handled through a series of methods, including:
- Exceptionally (Function<Throwable,? Extends T>fn): used to handle exceptions during execution;
- Handle (BiFunction<? Super T, Throwable,? Extends U>fn): used to handle execution results and exceptions;
- When Complete (BiConsumer<? Super T,? Super Throwable>action): Used to handle execution results and exceptions, without returning a new CompleteFuture object.
#### Concurrency control of CompleteableFuture
CompletedFuture provides a very powerful Concurrency control function, which can control the number and execution order of asynchronous operations. The commonly used control methods include the following:
- ThenApplyAsync (Function<? Super T,? Extends U>fn): used for asynchronous conversion operations;
- ThenApplyAsync (Function<? Super T,? Extends U>fn, Executor executor): used to perform conversion operations asynchronously and specify the Thread pool;
- ThenComposeAsync (Function<? Super T,? Extends CompletionStage>fn): used to asynchronously execute the operation of the next CompleteFuture object;
- ThenComposeAsync (Function<? Super T,? Extends CompletionStage>fn, Executor executor): used to asynchronously execute the operation of the next CompleteFuture object and specify the Thread pool;
- AllOf (CompleteFuture<?>... cfs): used to wait for the completion of multiple CompleteFuture objects;
- AnyOf (CompleteFuture<?>... cfs): Used to wait for any one of multiple CompleteFuture objects to complete.

In a word, CompleteFuture is a very powerful asynchronous programming tool. It provides rich combination, exception handling, Concurrency control and other functions, which can help developers handle asynchronous operations more conveniently and flexibly.
## Differences in Several Combination Methods of CompleteFuture
In CompleteFuture, thenApply, thenAccept, thenRun, thenCombine, and thenCompose are all methods used to handle asynchronous operation results. Their differences lie in their slightly different return values, parameters, execution methods, and other aspects.
### ThenApply
The thenApply method takes a parameter of type Function, which is used to convert the result of an asynchronous operation and return a new CompleteFuture object. This method will return a new CompleteFuture object with the result type being the return type of the conversion function.

Example code:
```Java
CompleteFuture<String>future=CompleteFuture. supplyAsync() - >"hello");
CompleteFuture<Integer>newFuture=future. thenApply (s - >s.length());
```
In the above code, a CompleteFuture object was first created using the supplyAsync method to asynchronously execute a task that returns a string type. Then, the CompleteFuture object is converted into a new CompleteFuture object using the thenApply method, which is used to asynchronously execute a task that returns an integer type. The conversion function returns the string length as the result.
### ThenAccept
The thenAccept method takes a parameter of type Consumer, which is used to consume the results of an asynchronous operation, but does not return a new CompleteFuture object. This method will return a new CompleteFuture object, but the result type of the object is Void.

Example code:
```Java
CompleteFuture<String>future=CompleteFuture. supplyAsync() - >"hello");
CompleteFuture<Void>newFuture=future. thenAccept (s - >System. out. println (s));
```
In the above code, a CompleteFuture object was first created using the supplyAsync method to asynchronously execute a task that returns a string type. Then, the CompleteFuture object is converted into a new CompleteFuture object using the thenAccept method, which is used to asynchronously consume the string and output it to the console.
### ThenRun
The thenRun method takes a Runnable type parameter, which is used to execute a task after an asynchronous operation is completed without accessing the results or context of the asynchronous operation. This method will return a new CompleteFuture object with a result type of Void.

Example code:
```Java
CompleteFuture<String>future=CompleteFuture. supplyAsync() - >"hello");
CompleteFuture<Void>newFuture=future. thenRun() - >System. out. println ("task finished");
```
In the above code, a CompleteFuture object was first created using the supplyAsync method to asynchronously execute a task that returns a string type. Then, the CompleteFuture object is converted into a new CompleteFuture object using the thenRun method, which is used to asynchronously execute a task and output a message after the task is completed.
### ThenCombine
The thenCombine method receives a parameter of type CompletionStage and a parameter of type BiFunction, which is used to combine the results of two asynchronous operations and return a new CompleteFuture object. This method will return a new CompleteFuture object with the result type being the return type of the composite function.

Example code:
```Java
CompleteFuture<String>future1=CompleteFuture. supplyAsync() - >"hello");
CompleteFuture<Integer>future2=CompleteFuture. supplyAsync (() - >10);
CompleteFuture<String>newFuture=future1. thenCombine (future2, (s, i) - >s+i);
```
In the above code, two CompleteFuture objects were first created using the supplyAsync method, which are used to asynchronously execute a task that returns a string type and a task that returns an integer type. Then, through then
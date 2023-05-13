## Creating and Destroying Objects
- Replacing Constructors with Static Factory Method
- Consider using a builder when encountering multiple constructor parameters
- Strengthening the Singleton property with private constructors or enumeration types
- Strengthening non instantiation capabilities through private constructors
- Prioritize dependency injection to introduce resources
- Avoid creating unnecessary objects
- Clear references to expired objects
- Avoid using termination and cleanup methods
- Try with resources takes precedence over try finally
## A method that is common to all objects
- Please follow the general convention when covering equals
- Always overwrite hashCode when overriding equals
- Always overwrite toString
- Carefully cover the clone
- Consider implementing the Comparable interface
## Classes and interfaces
- Minimize accessibility of classes and members
- To use access methods in public classes instead of public domains
- Minimize variability
- Composite prioritizes integration
- Either design inheritance and provide documentation, or prohibit inheritance
- Interface is better than abstract class
- Design interfaces for future generations
- Interface is only used to define types
- Class hierarchy is superior to label classes
- Static member classes outperform non- static member classes
- Restrict source files to a single top- level class
## Generics
- Please do not use the original ecological type
- Clear non checked warnings
- List is better than array
- Prioritize generic methods
- Utilizing restricted wildcards to enhance API flexibility
- Be cautious and use generics and variable parameters
- Prioritize type safe heterogeneous containers
## Enumeration and Annotation
- Replacing the int constant with enum
- Replacing ordinal numbers with instance fields
- Replacing Bitfields with EnumSet
- Replacing ordinal index with EnumMap
- Simulating Scalable Enumeration with an Interface
- Annotations are better than naming patterns
- Persist in using override annotations
- Defining Types with Markup Interface
## Lambda and Stream
- Lambda takes precedence over anonymous classes
- Method references take precedence over lambda
- Adhere to using standard function interfaces
- Use Stream with caution
- Prioritize selecting functions without side effects in Stream
- Stream should prioritize using Collection as the return type
- Use Stream parallelism with caution
## Method
- Check the validity of parameters
- Make protective copies when necessary
- Prudent Design Method Signature
- Be cautious when using heavy loads
- Be cautious in using variable parameters
- Returns zero length data or collection instead of null
- Be cautious and return to option
- Write document comments for all exported API elements
## Universal programming
- Minimize the scope of local variables
- For each loop takes precedence over traditional for loops
- Understanding and Using Class Libraries
- If you need precise answers, please avoid using float and double
- Basic type is better than packing basic type
- If other types are more suitable, try to avoid using strings as much as possible
- Understand the performance of string concatenation
- Referencing objects through interfaces
- Interface is better than reflection mechanism
- Use local methods with caution
- Carefully optimize
- Adhere to universally accepted naming conventions
## Abnormal
- Use exceptions only for exceptional situations
- Use checked exceptions for recoverable situations and runtime exceptions for programming errors
- Avoid unnecessary use of detected anomalies
- Exceptions that prioritize the use of standards
- Throw an exception corresponding to an abstract object
- All exceptions thrown by each method must be documented
- Include failure capture information in detail messages
- Try to keep failure atomicity
- Don't ignore exceptions
## Concurrent
- Synchronize access to shared variable data
- Avoid excessive synchronization
- Executor, task, and stream take precedence over threads
- Concurrent tools take precedence over wait and notify
- Documenting Thread Safety
- Be cautious when using delayed initialization
- Do not rely on thread schedulers
## Serialization
- Other methods take precedence over Java serialization
- Carefully implement the Serializable interface
- Consider using a custom serialization form
- Protectively writing readObject methods
- For instance control, enumeration types take precedence over readResolve
- Consider using serialization proxies instead of serialization instances
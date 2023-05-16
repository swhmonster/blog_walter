# Basic Principles of Spring Transaction Implementation
## Usage
```java
@EnableTransactionManagement
```
## Principle
1.Parsing Aspect ->The post processor of the first bean before bean creation parses the advisor (pointcut (pointcut parsed through @ Transactional), advisor) (This advisor registers a configuration class through @ enableTransactionManagement, which configures the advisor)

2.Create a dynamic proxy -->After the initialization of the bean, call the bean's post processor to create a dynamic proxy (jdk is used for interfaces, cglib is used for no interfaces). Before creating a dynamic proxy, match @ Transactional according to pointCut in the advisor (whether there are methods, whether there are classes, and whether there are interfaces or parent classes), and create a dynamic proxy when matching.

3.Calling: dynamic proxies

   try{
       
   4.Create a database connection and modify the autoCommit property of the database connection to false to prevent automatic commit of this connection. This is a very important step in implementing Spring transactions
   
   5.Then execute the target method method, which will perform database operations SQL

   } catch {
   
   6.If an exception occurs and it needs to be rolled back, the transaction will be rolled back. Otherwise, the transaction will still be committed
    
   }

7.After executing the current method, if there are no exceptions, directly commit the transaction
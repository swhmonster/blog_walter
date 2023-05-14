# How many requests can SpringBoot handle simultaneously?
> We all know that the default embedded container for SpringBoot is Tomcat, which means that our program is actually running inside Tomcat. So rather than saying how many requests SpringBoot can handle, it's better to say how many requests Tomcat can handle.
>
>The default configuration for Tomcat is in the spring configuration metadata. json file, and the corresponding configuration class is org. springframework. boot. autoconfigure. web. ServerProperties.
## Four parameters of thread pool
You can focus on the four common parameters of the offline process pool:
```json
{
  "name": "server.tomcat.threads.min-spare",
  "type": "java.lang.Integer",
  "description": "Minimum amount of worker threads.",
  "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat$Threads",
  "defaultValue": 10
},

{
  "name": "server.tomcat.max-threads",
  "type": "java.lang.Integer",
  "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat",
  "deprecated": true,
  "deprecation": {
    "replacement": "server.tomcat.threads.max"
  }
},
{
  "name": "server.tomcat.max-connections",
  "type": "java.lang.Integer",
  "description": "Maximum number of connections that the server accepts and processes at any given time. Once the limit has been reached, the operating system may still accept connections based on the \"acceptCount\" property.",
  "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat",
  "defaultValue": 8192
},

{
  "name": "server.tomcat.accept-count",
  "type": "java.lang.Integer",
  "description": "Maximum queue length for incoming connection requests when all possible request processing threads are in use.",
  "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat",
  "defaultValue": 100
},
```
- Server. tomcat. threads. min spare: The minimum number of worker threads, with a default size of 10. 
    - For most scenarios, setting it equal to the maximum number of threads is sufficient. 
    - The original intention of setting the minimum number of threads to be less than the maximum number of threads was to save resources, as creating an additional thread would consume a certain amount of resources, especially the resources required for the thread stack. But in a system, after selecting the maximum number of threads according to the hardware resources and task characteristics, it means that the system will always use these threads, so it is better to let the thread pool prepare the required threads at the beginning. However, setting the minimum number of threads to be less than the maximum number of threads has a very small impact, and generally no difference is noticed.

      In batch programs, it is not important whether the minimum number of threads is equal to the maximum number of threads. Because the final thread always needs to be created, the running time of the program should be almost the same. For the server program, the impact is small, but generally speaking, the threads in the thread pool should be created in the "warm-up" phase, so this is why it is recommended to set the minimum number of threads equal to the maximum number of threads.
          
      In some scenarios, it is also necessary to set a different minimum number of threads. For example, when a system needs to process a maximum of 2000 tasks simultaneously, and the average number of tasks is only 20, it is necessary to set the minimum number of threads to 20 instead of equal to its maximum number of threads of 2000. If the minimum number of threads is still set equal to the maximum number of threads at this time, then the idle thread will occupy a considerable amount of resources, especially when using a ThreadLocal type variable.
- Server.tomcat.threads.max: The maximum number of worker threads, with a default size of 200. 
  - Every time an HTTP request arrives at a web service, tomcat creates a thread to process the request, and the maximum number of threads determines how many requests the web service container can process simultaneously. MaxThreads defaults to 200, and it is definitely recommended to increase it. However, increasing threads comes at a cost. More threads not only bring more thread context switching costs, but also mean more memory consumption. By default, a thread stack of 1M is allocated when creating new threads in the JVM, so more threads require more memory. The empirical value for the number of threads is: 200 for 1 core and 2G of memory, and 200 for the number of threads; 4-core 8g memory, with an experience value of 800 threads.
- Server. tomcat. max connections: The maximum number of connections, with a default size of 8192.
  - The official document states:
  >   This parameter refers to the maximum number of connections that tomcat can accept at the same time. For Java's blocking BIO, the default value is the value of maxthreads; If a custom Executor executor is used in BIO mode, the default value will be the value of maxthreads in the executor. For the new NIO mode in Java, the default value of maxConnections is 10000.
  >
  >  For APR/native IO mode on Windows, the default value of maxConnections is 8192. This is due to performance reasons. If the configured value is not a multiple of 1024, the actual value of maxConnections will be reduced to the maximum multiple of 1024.
  >
  >  For example, if you set maxConnections to 5000, Tomcat will automatically adjust it to 4096 at runtime because it is the maximum multiple of 1024 (4 x 1024=4096). It can be understood that in APR/native IO mode, Tomcat mandates that the value of maxConnections must be a multiple of 1024 to ensure performance. If you set a value other than a multiple of 1024, Tomcat will automatically adjust the value of maxConnections to the maximum multiple of 1024**
  >
  >  If set to -1, the maxconnections feature is disabled, indicating that the number of connections to the tomcat container is not limited.
  The relationship between maxConnections and accept count is that when the number of connections reaches the maximum value of maxConnections, the system will continue to receive connections, but it will not exceed the value of acceptCount.
- server.tomcat.accept-count：The length of the waiting queue, with a default size of 100。
  - The description of the official document is：
  > The maximum length of the queue that can receive connection requests when all request processing threads are in use. When the queue is full, any connection requests will be rejected. The default value for accept count is 100.
  >
  >Specifically, when the number of HTTP requests reached the maximum number of threads called by Tomcat, new HTTP requests arrived. At this time, Tomcat will place the request in the waiting queue, and the acceptCount refers to the maximum number of waits that can be accepted, with a default of 100. If the waiting queue is also filled, any new requests will be rejected by tomcat (connection rejected).
## Illustration
![img.png](../../asserts/img/spring-handleRequestLimit.png)

min-spare、maxConnections、maxThreads、acceptCount关系之间，具体的关系如何呢？ 有不少的同学对于这个问题是云里雾里的，并且多次进行求助。这里用一个形象的比喻，通俗易懂的解释一下tomcat的最大线程数（maxThreads）、最大等待数（acceptCount）和最大连接数（maxConnections）三者之间的关系。

We can compare Tomcat to a hot pot restaurant, where the process is to pick up a number, take a seat, and call for a waiter. We can make three image analogies:
1. AcceptCount Maximum wait count

   It can be analogized as the maximum number of rows that can be accommodated in the row number area of a hot pot restaurant; The number of queue numbers is not unlimited. After the number of hotpot restaurants reaches a certain amount of data, the service often says that they are fully booked.
2. maxConnections Maximum number of connections

   It can be compared to the number of tables in the lobby of a hot pot restaurant, which is the number of tables that can be served. If all the tables are fully occupied, it indicates that the restaurant is full and has reached the service limit. No more customers can enter the restaurant.
3. maxThreads: Maximum number of threads

   It can be analogized as the number of chefs. Every chef can only stir fry one table at the same time, just like a thread in a JVM.
   
**The entire dining process is roughly as follows:**
1. Number retrieval: If the maxConnections connection count is not full, there is no need to retrieve the number, as there are still available tables. You can be directly taken to the dining table by the lobby waiter and ordered. If the maxConnections connection count is full, but the number of people taking the number does not reach acceptCount, then taking the number is successful. If the number of people taking the number has reached acceptCount, it will fail to take the number and receive a reply message from Tomcat's Connection refused connection.
2. Serving: If a table is available, it indicates that the maxConnections connection count is not full. People in line can enter the lobby to serve.
3. Dining: Cooking requires the chef to stir fry the dishes. The number of chefs is definitely lower than the number of customers. A chef must cook for multiple tables, and if there are more people eating, the chef will also be too busy. At this point, the chef can be added. Once the value of maxThreads reaches the upper limit, if it is still not enough, it can only slow down the serving speed of each table. This is a common embarrassing situation where the previous dish is eaten up and the next dish is not yet served.
## Code Example
Configure these parameters in application.yml, as the default quantity is too large for testing, so make it smaller:
```yml
server:
  tomcat:
    threads:
      # Minimum number of threads
      min-spare: 10
      # Maximum number of threads
      max: 30
    # maximum connection
    max-connections: 30
    # Maximum waiting times
    accept-count: 10
```
Write a simple interface again:
```java
 @GetMapping("/test")
     public String test(HttpServletRequest request) throws Exception {
          log.info("线程:{}", Thread.currentThread().getName());
          Thread.sleep(2000);
          return "success";
 }
```
## How can I configure it to improve my service efficiency?
**Firstly, this is related to the IO mode used by tomcat**

Knowledge of basic communication frameworks such as Java IO patterns and thread models for IO processing is an important and essential skill for Java programmers, and I will not go into too much detail here.
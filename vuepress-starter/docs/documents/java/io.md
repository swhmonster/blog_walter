How to solve the I/O bottleneck under high concurrency
What is I/O
I/O is the main channel for machines to obtain and exchange information, and flow is the main way to complete I/O operations. In computers, flow is a type of information transformation. Streams are ordered, so compared to a certain machine or application, we usually refer to the information received by the machine or application as an Input Stream, and the information output from the machine or application is called an Output Stream, collectively known as I/O Streams.
When exchanging information or data between machines or programs, objects or data are always first converted into some form of stream, and then transmitted through the stream to reach the specified machine or program before being converted into object data. Therefore, a stream can be seen as a carrier of data, through which data exchange and transmission can be achieved.
Java's I/O operation classes are located in the package java.io, where InputStream, OutputStream, and Reader and Writer classes are the four basic classes in the I/O package that handle byte streams and character streams, respectively. As shown in the following figure:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200612095230610.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)

Whether it's file read/write or network send/receive, the minimum storage unit for information is bytes. So why should I/O stream operations be divided into byte stream operations and character stream operations
We know that characters must undergo transcoding from byte to byte, which is a very time-consuming process. If we do not know the encoding type, it is easy to encounter garbled code problems. So the I/O stream provides a direct interface for manipulating characters, making it convenient for us to stream characters in our daily lives. Let's take a look at "byte stream" and "character stream" respectively.
1. Bytestream
   InputStream/OutputStream is an abstract class of byte streams, which have derived several subclasses that handle different types of operations. If it is a file read and write operation, use FileInputStream/FileOutputStream; If it is an array read and write operation, use ByteArrayInputStream/ByteArrayOutputStream; If it is a read and write operation of a regular string, use BufferedInputStream/BufferedOutputStream. The specific content is shown in the following figure:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200612095238437.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)
2. Character stream
   
Reader/Writer is an abstract class of character streams, and these two abstract classes also derive several subclasses. Different subclasses handle different operation types, as shown in the following figure:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200612095245945.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)

Performance issues with traditional I/O
We know that I/O operations are divided into disk I/O operations and network I/O operations. The former reads the data source from the disk and inputs it into the memory, and then persistence outputs the read information to the physical disk; The latter reads information from the network and inputs it into memory, ultimately outputting the information to the network. But whether it's disk I/O or network I/O, there are serious performance issues in traditional I/O.
1. Multiple memory copies
   In traditional I/O, we can read the data stream from the source data through InputStream and input it into a buffer, and output the data to external devices (including disks and networks) through OutputStream. You can first take a look at the specific process of input operations in the operating system, as shown in the following figure:
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200612095251412.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)
- The JVM will issue a read() system call and initiate a read request to the kernel through the read system call;
- The kernel sends read instructions to the hardware and waits for the read to be ready;
- The kernel copies the data to be read into the pointed kernel cache;
- The operating system kernel copies the data to the user space buffer, and then the read system call returns.
   In this process, the data is copied from the external device to the kernel space first, and then from the kernel space to the user space, which results in two memory copying operations. This operation can lead to unnecessary data copying and context switching, thereby reducing I/O performance.
2. Blockage
   In traditional I/O, the read() of InputStream is a while loop operation that waits for data to be read until it is ready before returning. This means that if there is no data ready, the read operation will remain suspended and the user thread will be in a blocked state.
   In the case of a small number of connection requests, using this method is not a problem and the response speed is also very high. But when a large number of connection requests occur, it is necessary to create a large number of listening threads. At this time, if the thread is not ready for data, it will be suspended and enter a blocking state. Once thread blockages occur, these threads will continuously grab CPU resources, leading to a large number of CPU context switches and increasing system performance overhead.
   How to optimize I/O operations
   Faced with the above two performance issues, not only has the programming language been optimized, but various operating systems have also further optimized I/O. JDK1.4 released the java. nio package (abbreviation for new I/O), and the release of NIO optimized for severe performance issues caused by memory replication and blocking. JDK1.7 also released NIO2, proposing asynchronous I/O implementation at the operating system level. Let's take a look at the specific optimization implementation below.
1. Optimize read/write stream operations using buffers
   In traditional I/O, stream based I/O implementations are provided, namely InputStream and OutputStream, which process data in bytes.
   NIO is different from traditional I/O in that it is block based and processes data on a block basis. The two most important components in NIO are the buffer and channel. A buffer is a contiguous memory block that serves as a transit point for NIO to read and write data. Channel represents the source or destination of buffered data, which is used to read buffered or write data, and is the interface for accessing buffered data.
   The biggest difference between traditional I/O and NIO is that traditional I/O is stream oriented, while NIO is buffer oriented. Buffer can read files into memory at once for subsequent processing, while the traditional method is to process data while reading files. Although traditional I/O also uses buffer blocks, such as BufferedInputStream, it still cannot be compared to NIO. Replacing traditional I/O operations with NIO can improve the overall performance of the system and achieve immediate results.
2. Use DirectBuffer to reduce memory replication
   In addition to optimizing buffer blocks, NIO's buffer also provides a class called DirectBuffer that can directly access physical memory. A regular buffer allocates JVM heap memory, while a DirectBuffer directly allocates physical memory (non heap memory).
   We know that data must be copied from the user space to the kernel space and then to the output device before being output to external devices. In Java, there is another copy in the user space, that is, it is copied from the Java heap memory to the temporary direct memory, and then to the memory space through the temporary direct memory. At this time, both direct memory and heap memory belong to user space.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200612095302160.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)
You must be thinking, why does Java need to copy data through a temporary non heap memory? If you simply use Java heap memory for data copying, when the amount of copied data is relatively large, the GC pressure of the Java heap will be relatively high, while using non heap memory can reduce the GC pressure.
DirectBuffer simplifies the process of saving data directly to non heap memory, thereby reducing one data copy. The following is the write method in the IOUtil. java class in the JDK source code:

```java
        if (src instanceof DirectBuffer)
            return writeFromNativeBuffer(fd, src, position, nd);

        // Substitute a native buffer
        int pos = src.position();
        int lim = src.limit();
        assert (pos <= lim);
        int rem = (pos <= lim ? lim - pos : 0); 
        ByteBuffer bb = Util.getTemporaryDirectBuffer(rem);
        try {
            bb.put(src);
            bb.flip();
        // ...............
```
Expanding here, as DirectBuffer requests non JVM physical memory, the cost of creation and destruction is high. The memory requested by DirectBuffer is not directly garbage collected by the JVM, but when the DirectBuffer wrapper class is collected, the memory block is released through the Java Reference mechanism.
DirectBuffer only optimizes the internal copy of user space. Previously, we said to optimize the copy of user space and kernel space. Can Java's NIO reduce the copy optimization of user space and kernel space?
The answer is yes, DirectBuffer allocates memory through the unsafe. allocateMemory (size) method, which is based on the local class Unsafe calling the native method for memory allocation. In NIO, there is another buffer class: MappedByteBuffer. Unlike DirectBuffer, MappedByteBuffer calls mmap through the local class to map the file memory. The map() system call method will directly copy the file from the hard disk to the user space, and only copy the data once, thus reducing the traditional read() method to copy the file from the hard disk to the kernel space.
3. Avoid blocking and optimize I/O operations
   Many people also refer to NIO as Non block I/O, which is non blocking I/O, because it better reflects its characteristics. Why do you say that?
   Even with the use of buffer blocks, traditional I/O still has blocking issues. Because the number of threads in the thread pool is limited, once a large number of concurrent requests occur, threads exceeding the maximum number can only wait until there are idle threads in the thread pool that can be reused. When reading the input stream of the socket, the read stream will remain blocked until any of the following three situations occur:
   Data readable;
   Connection release;
   Empty pointer or I/O abnormality.
   Blocking is the biggest drawback of traditional I/O. After the release of NIO, the two basic components of channel and multiplexer have achieved non blocking of NIO. Let's take a look at the optimization principles of these two components together.
   Channel
   As we discussed earlier, data reading and writing in traditional I/O is copied back and forth from user space to kernel space, while data in kernel space is read or written from disk through the I/O interface at the operating system level.
   At the beginning, when an application program calls the operating system I/O interface, the allocation is completed by the CPU, The biggest problem with this method is that "when a large number of I/O requests occur, it consumes a lot of CPU"; later, the operating system introduced DMA (direct memory storage), which is entirely responsible for accessing kernel space and disks. However, this method still requires permission from the CPU and requires the use of DMA buses to complete data replication operations. If there are too many DMA buses, it will cause bus conflicts.
   The emergence of channels solves the above problems. Channels have their own processors that can complete I/O operations between kernel space and disks. In NIO, we read and write data through a channel, which is bidirectional, so both reads and writes can occur simultaneously.
   Multiplexer
   The selector is the foundation of Java NIO programming. Used to check whether the state of one or more NIO channels is readable and writable.
   The selector is based on event driven implementation. We can register accept and read listening events in the selector, and the selector will continuously poll the registered channels. If a listening event occurs on a certain channel, the channel will be in a ready state and then perform I/O operations.
   A thread using a selector can listen to events on multiple channels through polling. We can set the channel to non blocking when registering it. When there are no I/O operations on the channel, the thread will not wait continuously, but will continuously poll all channels to avoid blocking.
   At present, the I/O multiplexing mechanism of the operating system uses epoll. Compared to the traditional select mechanism, epoll does not have a maximum connection handle limit of 1024. So in theory, a selector can poll thousands of clients.
   Below, I will use a real-life scenario as an example. After reading it, you will have a clearer understanding of the roles and roles of Channels and Selectors in non blocking I/O.
   We can compare listening to multiple I/O connection requests to the entrance of a train station. Previously, ticket checking could only allow passengers taking the nearest train to enter the station in advance, and there was only one ticket inspector. At this time, if passengers from other train numbers wanted to enter the station, they could only queue up at the station entrance. This is equivalent to that I/O operations of the thread pool were not implemented at the earliest.
   Later, the railway station was upgraded with several additional ticket entrances, allowing passengers of different train numbers to enter the station from their respective ticket entrances. This is equivalent to creating multiple listening threads with multiple threads, while listening to I/O requests from various clients.
   Finally, the railway station was upgraded and renovated to accommodate more passengers. Each train carried more passengers, and the train schedules were also arranged reasonably. Passengers no longer queue up and can enter the station through a large unified ticket checkpoint, which can simultaneously check tickets for multiple trains. This large ticket checkpoint is equivalent to a selector, a train number is equivalent to a channel, and passengers are equivalent to I/O flow.
   summary
   The traditional I/O of Java was initially implemented based on two operation streams, InputStream and OutputStream, which operate in bytes. In high concurrency and big data scenarios, it is easy to cause blocking, so the performance of this operation is very poor. In addition, the output data is copied from the user space to the kernel space and then to the output device, which will increase the performance overhead of the system.
   Traditional I/O later used Buffers to optimize the performance issue of "blocking", with buffer blocks as the minimum unit, but compared to the overall performance, it is still unsatisfactory.
   So NIO was released, which is a stream operation based on buffer blocks. On the basis of Buffer, two new components "pipeline and multiplexer" were added to achieve non blocking I/O. NIO is suitable for scenarios where a large number of I/O connection requests occur, and these three components together improve the overall performance of I/O.
   You can practice it through a few simple examples on Github







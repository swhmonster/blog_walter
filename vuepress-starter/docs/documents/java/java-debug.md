>Java调试体系，就是虚拟机的一整套用于调试的工具和接口。通过JDPA提供的API，开发人员可以方便灵活的搭建Java调试工具。
# JPDA组成模块
1. JVMTI（Java虚拟机工具接口）
2. JDWP（Java调试线协议）
3. JDI（Java调试接口）

### JVMTI
JVMTI定义了虚拟机应该提供的调试服务，包括调试信息（Information譬如栈信息）、调试行为（Action譬如客户端设置一个断点）和通知（Notification譬如到达某个断点时通知客户端），该接口由虚拟机实现者提供实现，并结合在虚拟机中 。
### JDWP
Java调试线协议，是一个为Java调试而制定的通讯交互协议，它定义了调试器和被调试程序之间传递信息的格式。JDWP详细完整地定义了请求命令、响应数据和错误代码，保证了调试器和被调试程序间JVMTI和JDI的通信通畅。       需要注意的是，JDWP本身并不包括传输层的实现，JDWP只包括了和传输层交互的定义。

### JDI
Java调试接口，是三个模块中最高层的接口，由Java语言实现。 JDI为开发人员提供了若干接口，不仅能格式化JDWP数据，而且还能为JDWP数据传输提供队列、缓存等优化服务。通过它，开发人员就能远程操控后端虚拟机上被调试程序的运行。我们一般的调试器也都是通过JDI接口构造出一套界面化的工具，达到易用的目的。


![在这里插入图片描述](https://img-blog.csdnimg.cn/20190917203608774.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)# JPDA如何运行？
JPDA的调试过程有几个重要的概念：调试者、被调试者、通信器。具体如下：
1. 被调试者 运行于我们想调试的Java虚拟机之上，它可以通过JVMTI这个标准接口，监控当前虚拟机的信息。
2. 调试者 定义了用户可使用的调试接口，通过这些接口，用户可以对被调试虚拟机发送调试命令，同时调试者接受并显示调试结果。
3. 通信器 将调试者与被调试者之间的调试命令和调试结果，封装成JDWP协议的包进行传输的。

# JDB调试-本地调试
>本文不针对开发工具，如IDEA、MyElipse等，远程调试做解释

JDB是基于文本和命令行的调试工具。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190917204143215.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)
1. 修改java启动脚本，把远程调试端口打开
JAVA_OPTS="$JAVA_OPTS -Xdebug -Xrunjdwp:transport=dt_socket,address=8787,server=y,suspend=n"
2. 程序运行起来
3. attach jdb到程序上，在程序所在机器上运行 下面的脚本
```shell
  $JAVA_HOME/bin/jdb -attach 127.0.0.1:8000
```
4. 指定断点，运行


### JDB调试-常用命令
```
run [类 [参数]] - 开始执行应用程序的主类
stop in <类 ID>.<方法>[(参数类型,...)]      - 在方法中设置断点
stop at <类 ID>:<行> - 在行中设置断点
locals - 输出当前堆栈帧中的所有局部变量
clear <类 ID>.<方法>[(参数类型,...)]          - 清除方法中的断点
clear <类 ID>:<行> - 清除行中的断点
clear - 列出断点
print <表达式> - 输出表达式的值
catch [uncaught|caught|all] <类 ID>|<类模式>  - 出现指定的异常时中断
ignore [uncaught|caught|all] <类 ID>|<类模式>  -- 对于指定的异常，取消 "catch"
watch [access|all] <类 ID>.<字段名>   - 监视对字段的访问/修改
unwatch [access|all] <类 ID>.<字段名>  - 停止监视对字段的访问/修改
step - 执行当前行
step up - 执行到当前方法返回到其调用程序
stepi - 执行当前指令
next - 跳过一行（跨过调用）
cont - 从断点处继续执行
dump –查看对象信息
list [line number|method] - 输出源代码
use（或 sourcepath） [源文件路径] - 显示或更改源路径
```







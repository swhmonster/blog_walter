# 性能分析命令
>jdk工具详解参看[Java 基础故障处理工具](../java/java-jdkcmdtool.md)

## JDK相关
### 查看进程
```
windows cmd:
netstat -ano|findstr "端口号"

Linux terminal:
netstat -ano|grep "端口号"

运行中的虚拟机进程
jps -l
jps -v | -V | -p
```

### JVM堆内存
- 堆使用情况
```
jmap -heap <pid>
jmap -dump:format=b,file=E:/nc.hprof <pid>
```

- 在线分析堆-使用内存较高，本机没有地方了可以在服务器直接执行
```
jhat -J-Xmx512M a1.log
```

- 存活对象情况
```
jmap -histo <pid>
jmap -histo:live <pid>
```
- dump堆到文件,format指定输出格式，live指明是活着的对象,file指定文件名
```
jmap -dump:live,format=b,file=dump.hprof <pid>
```
- 打印heap的概要信息，GC使用的算法，heap的配置及使用情况，可以用此来判断内存目前的使用情况以及垃圾回收情况
```
jmap -heap <pid>
```

- 打印堆的对象统计，包括对象数、内存大小等等
```
jmap -histo:live 这个命令执行，JVM会先触发gc，然后再统计信息
jmap -histo:live <pid> | more
```

- 堆dump原始方法
```
jmap -dump:live,format=b,file=heap.bin <pid> --heap.bin文件  
```
- 堆解析：
```
jhat heap.bin
jhat -J-mx1024m heap.bin  
```

### 查看cpu占用，配合jstack找到对应线程（Linux操作系统）
- top查看占用cpu较高的进程
- 命令dump所有线程
```
jstack -l 进程号 >> ./进程号.log
```
- 查看进程中每个线程的情况内存占用等
```
top -Hp pid   
```
- 得到进程的十六进制值，TIME列就是各个Java线程耗费的CPU时间，CPU时间最长的是线程ID为21742的线程，得到21742的十六进制值为54ee
```
printf "%x\n" 21742
```
- 查看堆栈信息，下一步终于轮到jstack上场了，它用来输出进程169527的堆栈信息，然后根据线程ID的十六进制值grep
```
jstack 169527|grep 54ee
```
- 强制执行命令
```
jstack -l -F 进程号 >> ./进程号-F.log
```

### 排查工具
##### Jvisualvm
```
%JAVA_PATH%/bin/jvisualvm
```

##### Java信息查看
```
jinfo <pid>
```

##### Jconsole 控制页面
```
jconsole <pid>
```

##### 线程查看工具
- TDA
- TDV
- JCA


##### 堆查看工具
- MAT

### Jstat查看GC
- 每隔1000s  打印一次共计打印5次
```
jstat -gcutil 8956 1000 5

jstat -gcutil <pid>:统计gc信息
显示列名具体描述
S0  年轻代中第一个survivor（幸存区）已使用的占当前容量百分比
S1  年轻代中第二个survivor（幸存区）已使用的占当前容量百分比
E   年轻代中Eden（伊甸园）已使用的占当前容量百分比
O   old代已使用的占当前容量百分比
P   perm代已使用的占当前容量百分比
YGC  从应用程序启动到采样时年轻代中gc次数
YGCT   从应用程序启动到采样时年轻代中gc所用时间(s)
FGC   从应用程序启动到采样时old代(全gc)gc次数
FGCT    从应用程序启动到采样时old代(全gc)gc所用时间(s)
GCT      从应用程序启动到采样时gc用的总时间(s)
```

### JVM配置（JDK6）
```
-Xms5024m   最小堆
-Xmx12048m  最大堆
-XX:PermSize=512m   永久带
-XX:MaxPermSize=1024m   永久带最大

-Dcom.sun.management.jmxremote=true 
-Dcom.sun.management.jmxremote.port=7070
-Dcom.sun.management.jmxremote.authenticate=false
-Dcom.sun.management.jmxremote.ssl=false
-Dsun.rmi.dgc.server.gcInterval=3600000
-Dsun.rmi.dgc.client.gcInterval=3600000
-Djava.rmi.server.hostname=147.1.3.15

-XX:+HeapDumpOnOutOfMemoryError     开启oom打印
-XX:HeapDumpPath=./java_pid<pid>.hprof  打印的文件
-Xloggc:./7070_gclog.txt    gc的log文件
-XX:+UseParNewGC    开启新生代并行回收、保持复制算法
-XX:+UseConcMarkSweepGC 开启老年代cms回收
-XX:CMSInitiatingOccupancyFraction=70   cms回收比例。70%开始gc
-XX:+UseCMSCompactAtFullCollection  Full GC后，进行一次整理，整理过程是独占的，会引起停顿时间变长。仅在使用CMS收集器时生效
-XX:CMSFullGCsBeforeCompaction=10   每10次full gc进行一次压缩
-XX:+DoEscapeAnalysis   开启逃逸分析
-XX:+PrintGC    打印GC
-XX:+PrintGCDetails 打印详细gc
-XX:+PrintGCDateStamps  打印触发的时间
-XX:+PrintGCTimeStamps  打印触发的时间
-XX:+CMSParallelRemarkEnabled   开启并行remark
-XX:+ScavengeBeforeFullGC       Old generation GC前对young generation GC一次，默认开启。
-XX:+CMSScavengeBeforeRemark    强制remark之前开始一次minor gc，减少remark的暂停时间，但是在remark之后也将立即开始又一次minor gc。
-XX:MaxTenuringThreshold=0  新生代标记多少次进入老年代，默认15

```

### JVM参数（JDK6）
```
java -Xmx3550m -Xms3550m -Xss128k -XX:NewRatio=4 -XX:SurvivorRatio=4 -XX:MaxPermSize=16m -XX:MaxTenuringThreshold=0

-Xmx3550m：设置JVM最大可用内存为3550M。

-Xms3550m：设置JVM促使内存为3550m。此值可以设置与-Xmx相同，以避免每次垃圾回收完成后JVM重新分配内存。

-Xmn2g：设置年轻代大小为2G。整个堆大小=年轻代大小 + 年老代大小 + 持久代大小。持久代一般固定大小为64m，所以增大年轻代后，将会减小年老代大小。此值对系统性能影响较大，Sun官方推荐配置为整个堆的3/8。

-Xss128k：设置每个线程的堆栈大小。JDK5.0以后每个线程堆栈大小为1M，以前每个线程堆栈大小为256K。更具应用的线程所需内存大小进行调整。在相同物理内存下，减小这个值能生成更多的线程。但是操作系统对一个进程内的线程数还是有限制的，不能无限生成，经验值在3000~5000左右。

-XX:NewRatio=4:设置年轻代（包括Eden和两个Survivor区）与年老代的比值（除去持久代）。设置为4，则年轻代与年老代所占比值为1：4，年轻代占整个堆栈的1/5

-XX:SurvivorRatio=4：设置年轻代中Eden区与Survivor区的大小比值。设置为4，则两个Survivor区与一个Eden区的比值为2:4，一个Survivor区占整个年轻代的1/6

-XX:MaxPermSize=16m:设置持久代大小为16m。

-XX:MaxTenuringThreshold=0：设置垃圾最大年龄。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。对于年老代比较多的应用，可以提高效率。如果将此值设置为一个较大值，则年轻代对象会在Survivor区进行多次复制，这样可以增加对象再年轻代的存活时间，增加在年轻代即被回收的概论。
```

### 一键dump脚本（shell）
```
#!/bin/bash

pid=$1
#echo $pid

# folder
if [ ! -d $pid  ];then
mkdir $pid
else
echo dir exist
fi

cd $pid

# print top
dateName=`date +%H%M%s`
topCmd="top -n 1 -b -Hp $pid | head -40 > top_$dateName.txt"
#echo $topCmd
eval $topCmd

# print jstack
for n in {1..3}
do
dumpName=`date +%H%M%s`
dumpCmd="jstack $pid > thread_$dumpName.tdump"
eval $dumpCmd
sleep 1
done

# print heap
`jmap -heap $pid > heap_$dateName.txt`

# print histo
`jmap -histo $pid > histo_$dateName.txt`

# print jinfo
`jinfo $pid > info_$dateName.txt`
```

## 操作系统相关
### Windows文件句柄数修改
注册表路径：
```
HKEY_LOCAL_MACHINE
  – SOFTWARE
  – – Microsoft
  – – – Windows NT
  – – – – CurrentVersion
  – – – – – Windows
```
USERProcessHandleQuota:项设置用户句柄数量，默认值同样为2710(16进制)/10000(10进制)，该值的允许范围为 200 ~ 18000 ，将其调整为更多的数值。同样地，对于具有2GB或更多物理内存的系统，不妨将用户句柄数直接设置为上限 18000(10进制)；

### Windows端口数和waittime修改
```
netsh int ipv4 set dynamicport tcp start=2000 num=63000

netsh int ipv4 set dynamicport udp start=2000 num=63000

netsh int ipv6 set dynamicport tcp start=2000 num=63000

netsh int ipv6 set dynamicport udp start=2000 num=63000
```

修改一下注册表缩短time-wait的时间，regedit打开注册表，添加DWORD值：
```
HKEY_LOCAL_MACHINE
  - SYSTEM
  - - CurrentControlSet
  - - - Services
  - - - - Tcpip
  - - - - - Parameters
```
"MaxUserPort"=dword:0000fffe
"TcpTimeWaitDelay"=dword:0000005 (缩短为5）


### 虚拟内存统计
```
vmstat -Sm -t 3 10
```

### 查看进程中线程
```
命令：top -Hp pid
说明：
PID — 进程id
USER — 进程所有者
PR — 进程优先级
NI — nice值。负值表示高优先级，正值表示低优先级
VIRT — 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
RES — 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
SHR — 共享内存大小，单位kb
S — 进程状态。D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程
%CPU — 上次更新到现在的CPU时间占用百分比
%MEM — 进程使用的物理内存百分比
TIME+ — 进程使用的CPU时间总计，单位1/100秒
COMMAND — 进程名称（命令名/命令行）
```

### Linux服务器参数
##### 常用参数
```
服务器参数
ulimit -a   //显示当前所有的 limit 信息
说明：
open files 文件描述符
max user processes 用户最大进程数
```

##### 修改进程数（root用户）
```
在/etc/security/limits.conf文件里添加如下内容：
* soft nproc 65535   # 打开进程数  
* hard nproc 65535   # 打开进程数

修改方法：
echo "* soft nproc 65535"  >> /etc/security/limits.conf
echo "* hard nproc 65535"  >> /etc/security/limits.conf

重启系统，确认修改成功。
```

##### 查看进程总数
```
ps -ef|wc -l
```

##### 查看系统设置的最大进程数
```
sysctl kernel.pid_max

修改方法：
vim /etc/sysctl.conf
kernel.pid_max = 196608
或：
echo "kernel.pid_max = 196608" >> /etc/sysctl.conf

重启系统，确认修改成功。
```

##### 查看当前进程数
```
ps -eLf | wc -l
```

##### 修改最大进程数
```
echo "kernel.pid_max=1000000 " >> /etc/sysctl.conf
sysctl -p
```

##### 查看某个服务的进程数，如java
```
ps -ef | grep java | wc -l
```

##### 查看cpu信息
```
cat /proc/cpuinfo
```

##### 系统可生成最大线程数
```
cat /proc/sys/kernel/threads-max
```

##### 进程最大线程数
```
cat /proc/sys/vm/max_map_count
```

##### 操作系统已用线程或进程数
```
cat /proc/sys/kernel/pid_max
```

##### 查看进程limits
```
cat /proc/<pid>/limits
```

##### 查看进程持有所有文件句柄数量
```
ls /proc/<pid>/fd | wc -l
```

### 网络排查
```
Fiddler
Wireshark
ping大包  ping -l 65500
```

### chmod命令：不可修改权限
```
chmod u+i filename
```

## 中间件相关
### 安装TAS
```
chmod 777 tas-install-2.6.1.jar 
java -jar tas-install-2.6.1.jar -console
```

### 启动Redis
```
nohup /opt/redis/redis-6679/src/redis-server /opt/redis/redis-6679/redis.conf &
nohup /opt/redis/redis-6679/src/redis-cli -p 6679 -a 123 shutdown &
```

### Sqlfx SQL分析
```
环境：
172.18.5.22 root 654321

1、进入到/opt/logAnalyze目录 创建 jdbcLog/np/172.18.5.22 文件夹
2、将jdbc日志放入上面172.18.5.22文件夹内
3、进入/opt/logAnalyze目录，执行sh run.sh analyzeLog np
```

## 数据库简易排查
### 数据库锁sql
```
SELECT  lc.spid AS spid, 
pr.spid AS "进程ID", 
pr.ipaddr AS "IP地址", 
pr.program_name AS "应用名称", 
pr.cmd AS "执行命令", 
db_name (lc.dbid) AS "数据库名",
object_name(lc.id,lc.dbid) AS "表名", 
lc.type AS "锁类型", 
pr.blocked AS "阻塞进程ID", 
bl.program_name AS "阻塞应用名称", 
bl.ipaddr AS "阻塞IP地址"
FROM master..syslocks lc
LEFT JOIN master..sysprocesses pr ON lc.spid = pr.spid
LEFT JOIN master..sysprocesses bl ON bl.spid = pr.blocked
```

### Top50 SQL
```
select top 50 s.SPID,p.ipaddr,p.program_name,s.CpuTime,t.LineNumber,t.SQLText
from
    master..monProcessStatement s,
    master..monProcessSQLText t,
    master..sysprocesses p
where 
    s.SPID=t.SPID
    and s.SPID = p.spid
    and p.spid != @@spid
order by 
    s.CpuTime desc
```

### Sybase RS命令
```
admin who_is_down
admin disk_space

```

## 日志文件相关
### 切分文件
```
split -l 10 filename  按行分割，每10行分割文件
split -b 10m filename  按大小分割，每10m分割文件
```

### sqlonly日志分析
```
awk '$1~/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}/ {x[$1"\t"$2"\t"$4"\t"FILENAME]+=1} END{for(i in x){printf("%s\t%d\n",i,x[i])}}' *.log |sort -k2> result.txt
```

# MySQL 8.0 新特性
## 1.系统表全部为InnoDB表
从MySQL 8.0开始，系统表全部换成事务型的InnoDB表，默认的MySQL实例将不包含任何MyISAM表，除非手动创建MyISAM表。
## 2.默认字符集改为utf8mb4
在MySQL 8.0版本之前，默认字符集为latin1，utf8字符集指向的是utf8mb3。网站开发人员在数据库设计的时候往往会将编码修改为utf8字符集。如果遗忘修改默认的编码，就会出现乱码的问题。从MySQL 8.0开始，数据库的默认编码改为utf8mb4，从而避免了上述的乱码问题。（比如图片表情的存储）
## 3.自增变量的持久化
在MySQL 8.0之前，自增主键AUTO_INCREMENT的值如果大于max(primary key)+1，在MySQL重启后，会重置AUTO_INCREMENT=max(primary key)+1，这种现象在某些情况下会导致业务主键冲突或者其他难以发现的问题。

在MySQL 5.7系统中，对于自增主键的分配规则，是由InnoDB数据字典内部一个计数器来决定的，而该计数器只在内存中维护，并不会持久化到磁盘中。

MySQL 8.0将自增主键的计数器持久化到重做日志中。每次计数器发生改变，都会将其写入重做日志中。如果数据库重启，InnoDB会根据重做日志中的信息来初始化计数器的内存值。为了尽量减小对系统性能的影响，计数器写入到重做日志时并不会马上刷新数据库系统。
## 4.加密函数
加密函数主要用来对数据进行加密和界面处理，以保证某些重要数据不被别人获取。这些函数在保证数据库安全时非常有用。本节将介绍各种加密函数的作用和使用方法。
### 4.1.加密函数MD5(str)
MD5(str)为字符串算出一个MD5 128比特校验和。该值以32位十六进制数字的二进制字符串形式返回，若参数为NULL，则会返回NULL。
### 4.2.加密函数SHA(str)
SHA(str)从原明文密码str计算并返回加密后的密码字符串，当参数为NULL时，返回NULL。SHA加密算法比MD5更加安全。
### 4.3.加密函数SHA2(str, hash_length)
SHA2(str, hash_length)使用hash_length作为长度，加密str。hash_length支持的值为224、256、384、512和0。其中，0等同于256。
## 5.窗口函数
在MySQL 8.0版本之前，没有排名函数，所以当需要在查询当中实现排名时，必须手写@变量，比较麻烦。在MySQL 8.0版本中，新增了一个窗口函数，用它可以实现很多新的查询方式。窗口函数类似于SUM()、COUNT()那样的集合函数，但它并不会将多行查询结果合并为一行，而是将结果放回多行当中。也就是说，窗口函数是不需要GROUP BY的。
## 6.GROUP BY不再隐式排序
从MySQL 8.0版本开始，MySQL对GROUP BY字段不再隐式排序。如果确实需要排序，必须加上ORDER BY子句。
## 7.通用表表达式
通用表表达式简称为CTE（Common Table Expressions）。CTE是命名的临时结果集，作用范围是当前语句。CTE可以理解成一个可以复用的子查询，当然跟子查询还是有点区别的，CTE可以引用其他CTE，但子查询不能引用其他子查询。

还有一种特殊的CTE，就是递归CTE，其子查询会引用自身。WITH子句必须以WITH RECURSIVE开头。CTE递归子查询包括两部分：seed查询和recursive查询，中间由union [all]或union distinct分隔。seed查询会被执行一次，以创建初始数据子集。recursive查询会被重复执行以返回数据子集，直到获得完整结果集。当迭代不会生成任何新行时，递归会停止。
## 8.DDL的原子化
在MySQL 8.0版本中，InnoDB表的DDL支持事务完整性，即DDL操作要么成功要么回滚。DDL操作回滚日志写入到data dictionary数据字典表mysql.innodb_ddl_log（该表是隐藏的表，通过show tables无法看到）中，用于回滚操作。通过设置参数，可将DDL操作日志打印输出到MySQL错误日志中。
## 9.支持降序索引
在MySQL 8.0之前，MySQL在语法上已经支持降序索引，但实际上创建的仍然是升序索引。
## 10.统计直方图
MySQL 8.0实现了统计直方图。利用直方图，用户可以对一张表的一列做数据分布的统计，特别是针对没有索引的字段。这可以帮助查询优化器找到更优的执行计划。

在数据库中，查询优化器负责将SQL转换成最有效的执行计划。有时候，查询优化器会找不到最优的执行计划，导致花费了更多不必要的时间。造成这种情况的主要原因是，查询优化器有时无法准确地知道以下几个问题的答案：
- 每个表有多少行？
- 每一列有多少不同的值？
- 每一列的数据分布情况如何？

直方图统计了表中某些字段的数据分布情况，为优化选择高效的执行计划提供参考。直方图与索引有着本质的区别：维护一个索引有代价，每一次的INSERT、UPDATE、DELETE都会需要更新索引，会对性能有一定的影响；而直方图一次创建永不更新，除非明确去更新它，所以不会影响INSERT、UPDATE、DELETE的性能。

建立直方图的时候，MySQL服务器会将所有数据读到内存中，然后在内存中进行操作，包括排序。如果对一个很大的表建立直方图，可能会需要将几百兆的数据都读到内存中。为了规避这种风险，MySQL会根据给定的histogram_generation_max_mem_size的值计算该将多少行数据读到内存中。
## 11.全局变量的持久化
在MySQL数据库中，全局变量可以通过SET GLOBAL语句来设置。例如，设置服务器语句超时的限制，可以通过设置系统变量max_execution_time来实现：
```shell
SET GLOBAL MAX_EXECUTION_TIME=2000;
```
使用SET GLOBAL语句设置的变量值只会临时生效。数据库重启后，服务器又会从MySQL配置文件中读取变量的默认值。

MySQL 8.0版本新增了SET PERSIST命令。例如，设置服务器的最大连接数为1000：
```shell
SET PERSIST max_connections=1000;
```
MySQL会将该命令的配置保存到数据目录下的mysqld-auto.cnf文件中，下次启动时会读取该文件，用其中的配置来覆盖默认的配置文件。
## 12.管理角色
在MySQL 8.0数据库中，角色可以看成是一些权限的集合，为用户赋予统一的角色，权限的修改直接通过角色来进行，无须为每个用户单独授权。
```shell
# 角色创建 与 角色赋权
CREATE ROLE role_tt; # 创建角色
GRANT SELECT ON db.* to 'role_tt'; # 给role_tt授予查询权限

# 用户赋予角色
CREATE USER 'myuser'@'%' identified by '123456'; # 创建用户myuser
GRANT 'role_tt' TO 'myuser'@'%'; # 给myuser赋予角色

# 角色的权限增减
GRANT INSERT ON db.* TO 'role_tt'; # 增加insert权限
REVOKE INSERT ON db.* FROM 'role_tt'; # 去除insert权限
```
## 13.日志分类更详细
在MySQL 8.0版本中，日志分类将更加详细。例如，在错误信息中添加了错误信息编号[MY-010311]和错误所属子系统[Server]。
## 14.支持不可见索引
不可见索引的特性对于性能调试非常有用。在MySQL 8.0中，索引可以被“隐藏”和“显示”。当一个索引被隐藏时，它不会被查询优化器所使用。也就是说，管理员可以隐藏一个索引，然后观察对数据库的影响。如果数据库性能有所下降，就说明这个索引是有用的，于是将其“恢复显示”即可；如果数据库性能看不出变化，说明这个索引是多余的，可以删掉了。
## 15.增加资源组
MySQL 8.0新增了一个资源组功能，用于调控线程优先级以及绑定CPU。MySQL用户需要有RESOURCE_GROUP_ADMIN权限才能创建、修改、删除资源组。
> 注意，在Linux环境下，MySQL进程需要有CAP_SYS_NICE权限才能使用资源组的完整功能。

MySQL 8.0默认提供两个资源组，分别是USR_default和SYS_default。
## 16.支持JSON类型
MySQL是一个关系型数据库，在MySQL 8.0之前，没有提供对非结构化数据的支持，但是如果用户有这样的需求，也可以通过MySQL的BLOB来存储非结构化的数据。

在MySQL 8.0中，已经实现了对JSON类型的支持。MySQL本身已经是一个比较完备的数据库系统，对于底层存储并不适合有太大的改动，那么MySQL是如何支持JSON格式的呢？

MySQL 8.0对支持JSON的做法是在Server层提供一些便于操作JSON的函数，简单地将JSON编码成BLOB，然后交由存储引擎层进行处理。MySQL 8.0的JSON支持与存储引擎没有关系，MyISAM存储引擎也支持JSON格式。
## 17.全文索引的加强
MySQL 8.0支持更加灵活、更加优化的全文搜索。例如，全本索引支持外部的分析器，就像MyISAM。插件可以替代内置分析器，也可以作为一个前端来使用。MySQL 8.0实现了标记优化器，这个优化器可以将查询结果传递到InnoDB，因此InnoDB可以跳过全文检索部分。

在InnoDB上实现了支持CJK（中文、日文和韩文）的全文检索。MySQL 8.0为CJK提供了一个默认的全文分析器（N-GRAM分析器）。

在全文索引中，n-gram就是一段文字里面连续的n个字的序列。例如，用n-gram来对“春花秋月”进行分词，得到的结果如表21.18所示。其中，n由参数ngram_token_size控制，即分词的大小，默认是2。
## 18.动态修改InnoDB缓冲池的大小
从MySQL 5.7.5版本起，MySQL支持在不重启系统的情况下动态调整innodb_buffer_pool_size。调整大小的过程是以innodb_buffer_pool_chunk_size为单位迁移pages到新的内存空间，迁移进度可以通过Innodb_buffer_pool_resize_status查看。当在线修改缓冲池大小的时候，以chunk为单位进行增长或收缩。

缓冲池大小是innodb_buffer_pool_chunk_size*innodb_buffer_pool_instances的倍数（128MB），如果不是，将会适当调大innodb_buffer_pool_size，以满足要求。因此，可能会出现缓冲池大小的实际分配比配置文件中指定的size要大的情况。
## 19.表空间数据加密
在MySQL 8.0中，InnoDB Tablespace Encryption支持对独享表空间的InnoDB数据文件加密，其依赖keyring plugin来进行秘钥的管理。开启加密功能需要启动参数--early-plugin-load。
## 20.跳过锁等待
在MySQL 5.7版本中，SELECT...FOR UPDATE语句在执行的时候，如果获取不到锁，会一直等待，直到innodb_lock_wait_timeout超时。

在MySQL 8.0版本中，通过添加NOWAIT和SKIP LOCKED语法，能够立即返回。如果查询的行已经加锁，那么NOWAIT会立即报错返回，而SKIP LOCKED也会立即返回，只是返回的结果中不包含被锁定的行。
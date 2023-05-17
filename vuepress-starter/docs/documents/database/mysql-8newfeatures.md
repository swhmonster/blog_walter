# New features of MySQL 8.0
## 1. All system tables are InnoDB tables
Starting from MySQL 8.0, all system tables will be replaced with transactional InnoDB tables. The default MySQL instance will not contain any MyISAM tables unless manually created.
## 2. Change the default character set to utf8mb4
Before MySQL 8.0, the default character set was latin1, and the utf8 character set pointed to utf8mb3. Website developers often change the code to utf8 character set when designing database design. If you forget to modify the default encoding, there will be garbled code issues. Starting from MySQL 8.0, the default encoding of the database has been changed to utf8mb4, thereby avoiding the aforementioned garbled code issue. (For example, storage of image emoticons)
## 3. persistence of self increasing variables
Before MySQL 8.0, the autoincrement primary key AUTO_ If the value of INCREMENT is greater than max (primary key)+1, AUTO will be reset after MySQL restarts_ INCREMENT=max (primary key)+1, which in some cases can lead to business primary key conflicts or other difficult to detect issues.

In MySQL 5.7, the allocation rules for auto increment primary keys are determined by a counter in the InnoDB data dictionary, which is only maintained in memory and is not persistence to disk.

MySQL 8.0 persists the counter of the auto increment primary key to the redo log. Every time the counter changes, it is written to the redo log. If the database restarts, InnoDB will initialize the memory value of the counter based on the information in the redo log. In order to minimize the impact on system performance, the counter does not immediately refresh the database system when written to the redo log.
## 4. Encryption function
The encryption function is mainly used to encrypt data and process interfaces to ensure that certain important data is not obtained by others. These functions are very useful in ensuring database security. This section will introduce the functions and usage methods of various encryption functions.
### 4.1. Encryption Function MD5 (str)
MD5 (str) calculates an MD5 128 bit checksum for a string. This value is returned as a binary string of 32-bit hexadecimal digits, and if the parameter is NULL, it will return NULL.
### 4.2. Encryption Function SHA (str)
SHA (str) calculates and returns the encrypted password string from the original plaintext password str, and returns NULL when the parameter is NULL. The SHA encryption algorithm is more secure than MD5.
### 4.3. Encryption Function SHA2 (str, hash_length)
SHA2 (str, hash_length) using hash_ Length is used as the length to encrypt str. hash_ The supported values for length are 224, 256, 384, 512, and 0. Among them, 0 is equivalent to 256.
## 5. Window function
Before MySQL 8.0, there was no ranking function, so when it was necessary to implement ranking in queries, the @ variable had to be handwritten, which was quite cumbersome. In MySQL 8.0 version, a new window function has been added, which can be used to implement many new query methods. The window function is similar to set functions such as SUM() and COUNT(), but it does not merge multiple rows of query results into one row, but instead puts the results back into multiple rows. That is to say, the window function does not require GROUP BY.
## 6. GROUP BY no longer implicitly sorts
Starting from MySQL version 8.0, MySQL no longer implicitly sorts the GROUP BY field. If sorting is indeed necessary, an ORDER BY clause must be added.
## 7. General Table Expression
The common table expressions are abbreviated as CTE (Common Table Expressions). CTE is a named temporary result set that is scoped to the current statement. CTE can be understood as a reusable subquery, but there is still a slight difference between CTE and subquery. CTE can refer to other CTEs, but subqueries cannot refer to other subqueries.

There is also a special type of CTE, which is recursive CTE, where subqueries refer to themselves. The With clause must start with With RECURSIVE. CTE recursive subqueries include two parts: seed queries and recursive queries, separated by union [all] or union distinct. The seed query will be executed once to create an initial subset of data. Recursive queries are repeated to return a subset of data until the complete result set is obtained. When iteration does not generate any new rows, recursion stops.
## 8. Atomization of DDL
In MySQL 8.0, the DDL of InnoDB tables supports transaction integrity, meaning that DDL operations are either successful or rolled back. DDL operation rollback log is written to the data dictionary data dictionary table mysql.innodb_ ddl_ In log (which is a hidden table that cannot be seen through show tables), it is used for rollback operations. By setting parameters, DDL operation logs can be printed and output to MySQL error logs.
## 9. Support for descending indexing
Before MySQL 8.0, MySQL already supported descending indexes in syntax, but in reality, it still created ascending indexes.
## 10. Statistical Histogram
MySQL 8.0 implements statistical histograms. By using histograms, users can perform data distribution statistics on a column of a table, especially for fields without indexes. This can help the query optimizer find better execution plans.

In the database, the query optimizer is responsible for converting SQL into the most effective execution plan. Sometimes, the query optimizer may not find the optimal execution plan, resulting in spending more unnecessary time. The main reason for this situation is that the query optimizer sometimes cannot accurately know the answers to the following questions:
- How many rows are there in each table?
- How many different values are there for each column?
- What is the distribution of data in each column?

- The histogram statistics the data distribution of certain fields in the table, providing reference for optimizing and selecting efficient execution plans. There is a fundamental difference between histograms and indexes: maintaining an index comes at a cost, and every insert, update, or delete requires updating the index, which can have a certain impact on performance; The histogram is never updated once created, unless it is explicitly updated, so it will not affect the performance of Insert, UPDATE, and DELETE.

- When creating a histogram, the MySQL server reads all data into memory and performs operations in memory, including sorting. If a histogram is established for a large table, it may be necessary to read hundreds of megabytes of data into memory. To avoid this risk, MySQL will use the given histogram_ generation_ max_ mem_ The value of size calculates how many rows of data should be read into memory.
## 11. persistence of Global Variables
In the MySQL database, global variables can be set through the SET GLOBAL statement. For example, setting a limit on server statement timeout can be achieved by setting the system variable max_ execution_ Time to achieve:
```shell
SET GLOBAL MAX_ EXECUTION_ TIME=2000;
```
The variable values set using the SET GLOBAL statement will only take effect temporarily. After the database restarts, the server will read the default values of variables from the MySQL configuration file.

The SET PERSIST command has been added to MySQL 8.0. For example, setting the maximum number of connections to the server to 1000:
```shell
SET PERSIST max_ connections=1000;
```
MySQL will save the configuration of this command to the mysqld-auto.cnf file in the data directory. The next time it starts, it will read the file and overwrite the default configuration file with the configuration in it.
## 12. Management Role
In the MySQL 8.0 database, roles can be seen as a collection of permissions, assigning users a unified role, and modifying permissions directly through the role without requiring separate authorization for each user.
```shell
#Role creation and role empowerment
CREATE ROLE role_ tt; #  Create Role
GRANT SELECT ON db.* to 'role_ tt'; #  To role_ Grant query permission
#User assigned roles
CREATE USER 'myuser'@'%' identified by '123456'; #  Create user myuser
GRANT 'role_ tt' TO 'myuser'@'%'; #  Assign roles to myuser
#Role permissions increase or decrease
GRANT INSERT ON db.* TO 'role_ tt'; #  Add insert permission
REVOKE INSERT ON db.* FROM 'role_ tt'; #  Remove insert permission
```
## 13. More detailed classification of logs
In MySQL 8.0 version, log classification will be more detailed. For example, the error message number [MY-010311] and the subsystem to which the error belongs [Server] were added to the error message.
## 14. Support for Invisible Indexing
The feature of invisible indexes is very useful for performance debugging. In MySQL 8.0, indexes can be "hidden" and "displayed". When an index is hidden, it is not used by the query optimizer. That is to say, administrators can hide an index and observe the impact on the database. If the database performance decreases, it indicates that this index is useful, so it can be "restored to display"; If the database performance does not show any changes, it indicates that this index is redundant and can be deleted.
## 15. Add Resource Group
MySQL 8.0 has added a resource group function to regulate thread priority and bind CPUs. MySQL users need to have a Resource_ GROUP_ ADMIN permission is required to create, modify, and delete resource groups.
> Note that in a Linux environment, MySQL processes require a CAP_ SYS_ NICE permission is required to use the full functionality of resource groups.

MySQL 8.0 provides two resource groups by default, namely USR_ Default and SYS_ default.
## 16. Support JSON types
MySQL is a relational database. Before MySQL 8.0, it did not provide support for unstructured data. However, if users have such requirements, they can also use MySQL BLOBs to store unstructured data.

In MySQL 8.0, support for JSON types has been implemented. MySQL itself is already a relatively complete database system, and it is not suitable for making significant changes to the underlying storage. So how does MySQL support JSON format?

The approach of MySQL 8.0 to support JSON is to provide some easy to operate JSON functions in the server layer, simply encoding JSON into BLOB, and then handing it over to the storage engine layer for processing. The JSON support of MySQL 8.0 is not related to the storage engine, and the MyISAM storage engine also supports JSON format.
## 17. Enhancement of full-text indexing
MySQL 8.0 supports more flexible and optimized full-text search. For example, the full index supports external analyzers, such as MyISAM. Plugins can replace built-in analyzers or serve as a front-end. MySQL 8.0 implements a tag optimizer that can pass query results to InnoDB, so InnoDB can skip the full-text search section.

Implemented full text retrieval support for CJK (Chinese, Japanese, and Korean) on InnoDB. MySQL 8.0 provides a default full-text analyzer (N-GRAM analyzer) for CJK.

In full-text indexing, n-gram is a sequence of consecutive n words within a paragraph of text. For example, using n-gram to segment "spring flowers and autumn months" yields the results shown in Table 21.18. Among them, n is determined by the parameter ngram_ token_ Size control, which means the size of the participle, defaults to 2.
## 18. Dynamically Modifying the Size of InnoDB Buffer Pool
Starting from MySQL version 5.7.5, MySQL supports dynamic adjustment of innodb without restarting the system_ buffer_ pool_ size。 The process of resizing is to use innodb_ buffer_ pool_ chunk_ Migrate pages to new memory space in units of size, and the migration progress can be achieved through Innodb_ buffer_ pool_ resize_ Status view. When modifying the buffer pool size online, grow or shrink in chunks.

The buffer pool size is innodb_ buffer_ pool_ chunk_ size*innodb_ buffer_ pool_ The multiple of instances (128MB), if not, will increase innodb appropriately_ buffer_ pool_ Size to meet the requirements. Therefore, there may be situations where the actual allocation of buffer pool size is larger than the size specified in the configuration file.
## 19. Table space data encryption
In MySQL 8.0, InnoDB Tablespace Encryption supports encryption of InnoDB data files for exclusive tablespaces, relying on keyring plugins for key management. Enabling the encryption function requires the activation parameter - early plugin load.
## 20. Skip lock waiting
In MySQL version 5.7, if the SELECT... FOR UPDATE statement cannot obtain a lock during execution, it will wait until innodb_ lock_ wait_ Timeout timeout.

In MySQL 8.0, by adding NOWAIT and SKIP Locked syntax, immediate returns can be achieved. If the queried row has already been locked, NOWAIT will immediately report an error and return it, and SKIP Locked will also.
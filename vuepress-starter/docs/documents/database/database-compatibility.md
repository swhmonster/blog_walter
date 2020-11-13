# 主流数据库兼容性验证
## 数据库字column类型射参考表格
|	MySQL Data Type	|	Percona Data Type	|	Oracle Data Type	|	Java	|	推荐使用	|
|	---	|	---	|	---	|	---	|	---	|
|	BIGINT	|	BIGINT	|	NUMBER(19, 0)	|	java.lang.Long	|	Y	|
|	BIT	|	BIT	|	RAW	|	byte[]	|	Y	|
|	BLOB	|	BLOB	|	BLOB, RAW	|	byte[]	|	N	|
|	CHAR	|	CHAR	|	CHAR	|	java.lang.String	|	Y	|
|	DATE	|	DATE	|	DATE	|	java.sql.Date	|	Y	|
|	DATETIME	|	DATETIME	|	DATE	|	java.sql.Timestamp	|	Y	|
|	DECIMAL	|	DECIMAL	|	FLOAT (24)	|	java.math.BigDecimal	|	N	|
|	DOUBLE	|	DOUBLE	|	FLOAT (24)	|	java.lang.Double	|	N	|
|	DOUBLE PRECISION	|	DOUBLE PRECISION	|	FLOAT (24)	|	java.lang.Double	|	N	|
|	ENUM	|	ENUM	|	VARCHAR2	|	java.lang.String	|		|
|	FLOAT	|	FLOAT	|	FLOAT	|	java.lang.Float	|		|
|	INT	|	INT	|	NUMBER(10, 0) 	|	java.lang.Integer	|	Y	|
|	INTEGER 	|	INTEGER 	|	NUMBER(10, 0) 	|	java.lang.Integer	|	Y	|
|	LONGBLOB 	|	LONGBLOB 	|	BLOB, RAW 	|	byte[]	|	N	|
|	LONGTEXT 	|	LONGTEXT 	|	CLOB, RAW 	|	java.lang.String	|	N	|
|	MEDIUMBLOB 	|	MEDIUMBLOB 	|	BLOB, RAW 	|	byte[]	|	N	|
|	MEDIUMINT 	|	MEDIUMINT 	|	NUMBER(7, 0) 	|	java.lang.Integer	|	N	|
|	MEDIUMTEXT 	|	MEDIUMTEXT 	|	CLOB, RAW 	|	java.lang.String	|	N	|
|	NUMERIC 	|	NUMERIC 	|	NUMBER 	|		|	Y	|
|	REAL 	|	REAL 	|	FLOAT (24) 	|		|	N	|
|	SET 	|	SET 	|	VARCHAR2 	|	java.lang.String	|	N	|
|	SMALLINT 	|	SMALLINT 	|	NUMBER(5, 0) 	|	java.lang.Integer	|	N	|
|	TEXT 	|	TEXT 	|	VARCHAR2, CLOB 	|	java.lang.String	|		|
|	TIME 	|	TIME 	|	DATE 	|	java.sql.Time	|		|
|	TIMESTAMP 	|	TIMESTAMP 	|	DATE 	|	java.sql.Timestamp	|		|
|	TINYBLOB 	|	TINYBLOB 	|	RAW 	|	byte[]	|		|
|	TINYINT	|	TINYINT	|	TINYINT	|	java.lang.Boolean	|		|
|	TINYTEXT	|	TINYTEXT	|	VARCHAR2	|	java.lang.String	|		|
|	VARCHAR	|	VARCHAR	|	VARCHAR2, CLOB 	|	java.lang.String	|		|
|	YEAR	|	YEAR	|	YEAR	|	java.sql.Date（日期设为2月1日点	|	Y	|
## 数据库SQL验证
### 常用查询SQL
|	示例SQL	|	描述	|	mysql	|	percona	|	oracle	|	达梦	|	OB	|	快立方	|
|	---	|	---	|	---	|	---	|	---	|	---	|	---	|	---	|
|	select user_name,address from user_info	|	全表查询	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	select user_name,address from user_info where user_info_id =1	|	主健查询	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	select user_name , address from user_info order by user_name	|	排序	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|		|	分页查询	|	TBD	|	TBD	|	TBD	|	TBD	|	TBD	|	TBD	|
|	SELECT column_name(s)  FROM table_name1 LEFT JOIN table_name2 ON table_name1.column_name=table_name2.column_name 	|	左连接	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	SELECT column_name(s) FROM table_name1 RIGHT JOIN table_name2 ON table_name1.column_name=table_name2.column_name 	|	右连接	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	SELECT column_name(s) FROM table_name1 FULL JOIN table_name2 ON table_name1.column_name=table_name2.column_name	|	全连接	|	不支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	SELECT column_name(s) FROM table_name1 UNION SELECT column_name(s) FROM table_name2  INSERT INTO Persons VALUES ('Gates', 'Bill', 'Xuanwumen 10', 'Beijing')	|	内连接	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	DELETE FROM user_info WHERE user_name = 'Wilson'	|	delete	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|		|	正则表达式	|		|		|		|		|		|		|
|		|	通配符%	|		|		|		|		|		|		|
|		|	通配符_	|		|		|		|		|		|		|
|		|	通配符^	|		|		|		|		|		|		|
|		|	AND 运算符	|		|		|		|		|		|		|
|		|	OR 运算符	|		|		|		|		|		|		|
|	SELECT id, name, c_time FROM mytest LIMIT 2 OFFSET 1	|	分页	|	支持	|		|	不支持	|		|		|		|
|	SELECT * FROM ( SELECT ta.*,rownum r FROM (SELECT ID,NAME,C_TIME FROM T_MYTEST ) ta WHERE rownum<=3) WHERE r>1	|	三层分页	|	不支持	|		|	支持	|		|		|		|
|	SELECT a.ID, a.NAME, a.C_TIME, b.NAME b_name FROM T_MYTEST a LEFT JOIN T_MYTEST b ON a.ID = b.ID	|	左关联	|	支持	|		|	支持	|		|		|		|
|	SELECT a.ID, a.NAME, a.C_TIME, b.NAME b_name FROM T_MYTEST a RIGHT JOIN T_MYTEST b ON a.ID = b.ID	|	右关联	|	支持	|		|	支持	|		|		|		|
|	SELECT a.ID, a.NAME, a.C_TIME, b.NAME b_name FROM T_MYTEST a INNER JOIN T_MYTEST b ON a.ID = b.ID	|	内关联	|	支持	|		|	支持	|		|		|		|
|	SELECT a.NAME name FROM T_MYTEST a GROUP BY a.NAME	|	group by	|	支持	|		|	支持	|		|		|		|
|	SELECT a.ID, a.NAME, a.C_TIME, b.NAME b_name FROM T_MYTEST a, T_MYTEST b WHERE a.ID = b.ID	|	多表查询	|	支持	|		|	支持	|		|		|		|
|	SELECT a.id, a.name, a.c_time FROM (SELECTid,name,c_time FROM mytest) AS a	|	子查询	|	支持	|		|	支持	|		|		|		|
|	SELECT a.id, a.name FROM mytest AS a UNION SELECT b.id, b.name FROM mytest AS b	|	联合查询（去重）	|	支持	|		|	支持	|		|		|		|
|	SELECT a.id, a.name FROM mytest AS a UNION ALL SELECT b.id, b.name FROM mytest AS b	|	联合查询	|	支持	|		|	支持	|		|		|		|

### 建表语句
### 视图测试
|	描述	|	mysql	|	percona	|	oracle	|	达梦	|
|	---	|	---	|	---	|	---	|	---	|
|	创建视图	|	支持	|	支持	|	支持	|	支持	|
|	修改视图	|	支持	|	支持	|	支持	|	支持	|
|	更新视图	|	支持	|	支持	|	支持	|	支持	|
|	查看视图	|	TBD	|	TBD	|	TBD	|	TBD	|
|	删除视图	|	支持	|	支持	|	支持	|	支持	|
### Alter语句
|	示例SQL	|	描述	|	mysql	|	percona	|	oracle	|	达梦	|	OB	|	快立方	|
|	---	|	---	|	---	|	---	|	---	|	---	|	---	|	---	|
|	"ALTER TABLE Persons
ALTER COLUMN Birthday year"	|	改变数据类型实例	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	"ALTER TABLE Person
DROP COLUMN Birthday"	|	DROP COLUMN 实例	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
|	"ALTER TABLE Persons
ALTER COLUMN Birthday year"	|	ADD  COLUMN 实例	|	支持	|	支持	|	支持	|	支持	|	支持	|	支持	|
### DISTINCT 语句
|示例SQL							|	描述			|mysql	|percona|oracle	|达梦	|OB		|快立方|
|---|---|---|---|---|---|---|---|
|SELECT DISTINCT Company FROM Orders|	DISTINCT 语句	|支持	|支持	|支持	|支持	|支持	|支持  |
|SELECT DISTINCT Company FROM Orders|	DISTINCT 语句	|支持	|支持	|支持	|支持	|支持	|支持  |
|SELECT DISTINCT Company FROM Orders|	DISTINCT 语句	|支持	|支持	|支持	|支持	|支持	|支持  |
### 高级函数
|	函数名(hs_func)	|	mysql_func	|	oracle_func	|	percona_func	|	快立方	|	描述	|
|	---	|	---	|	---	|	---	|	---	|	---	|
|	hs_datediff(d1,d2)	|	datediff(date1,date2)	|	d1-d2	|	datediff(date1,date2)	|	datediff(date1,date2)	|		|
|	hs_datetime_int(str, YYYYMMDD)/hs_datetime_int(str, HH24MISS)	|	cast(DATE_FORMAT(str,'%Y%m%d') AS SIGNED INTEGER)/ cast(DATE_FORMAT(str,'%H%i%s') AS SIGNED INTEGER)	|	to_number(to_char(str, 'YYYYMMDD'))/to_number(to_char(str, 'HH24MISS'))	|	cast(DATE_FORMAT(str,'%Y%m%d') AS SIGNED INTEGER)/ cast(DATE_FORMAT(str,'%H%i%s') AS SIGNED INTEGER)	|	cast(DATE_FORMAT(str,'%Y%m%d') AS SIGNED INTEGER)/ cast(DATE_FORMAT(str,'%H%i%s') AS SIGNED INTEGER)	|	YYYYMMDD和HH24MISS可以用单引号括起来	|
|	hs_trim(str)	|	(isnull(str) or length(trim(str))<1)	|	trim(str) in null	|	(isnull(str) or length(trim(str))<1)	|	(isnull(str) or length(trim(str))<1)	|		|
|	hs_max(expr)/hs_min(expr)	|	max(expr)/min(expr)	|	max(expr)/min(expr)	|	max(expr)/min(expr)	|	max(expr)/min(expr)	|		|
|	hs_sysdate()	|	now()	|	sysdate	|	now()	|	now()	|		|
|	hs_length(str)	|	length(str)	|	length(str)	|	length(str)	|	length(str)	|		|
|	hs_tochar(ch)	|	cast(ch as char)	|	to_char(ch)	|	cast(ch as char)	|	cast(ch as char)	|		|
|	hs_round(1.23456,4)	|	round(1.23456,4)	|	round(1.23456,4)	|	round(1.23456,4)	|	round(1.23456,4)	|		|
|	hs_lpad('abcd',14, '0')	|	lpad('abcd',14, '0')	|	lpad('abcd',14, '0')	|	lpad('abcd',14, '0')	|	lpad('abcd',14, '0')	|		|
|	hs_time_int()	|	cast(DATE_FORMAT(NOW(),'%H%i%s') AS SIGNED INTEGER)	|	to_number(to_char(sysdate, 'HH24MISS'))	|	cast(DATE_FORMAT(NOW(),'%H%i%s') AS SIGNED INTEGER)	|	cast(DATE_FORMAT(NOW(),'%H%i%s') AS SIGNED INTEGER)	|		|
|	hs_to_date(str, mysql_format, oracle_format)	|	str_to_date(str,mysql_format)	|	to_date(str,oracle_format)	|	str_to_date(str,mysql_format)	|	str_to_date(str,mysql_format)	|	只传str或format传'',会采用默认格式。mysql默认格式：'%Y-%m-%d';oracle默认格式：'yyyy-mm-dd'。只传两个参数时，第二个参数如果为'YYYYMMDD'，转换后的myql格式为'%Y%m%d'，oracle格式为'yyyymmdd'；如果第二个参数为'YYYY-MM-DD'，则转换后的myql格式为'%Y-%m-%d'，oracle格式为'yyyy-mm-dd'；如果不是以上两种格式，则转换后mysql和oracle都为所填格式	|
|	hs_abs(-1)	|	abs(-1)	|	abs(-1)	|	abs(-1)	|	abs(-1)	|		|
|	hs_date_int()	|	cast(DATE_FORMAT(NOW(),'%Y%m%d') AS SIGNED INTEGER)	|	to_number(to_char(sysdate, 'YYYYMMDD'))	|	cast(DATE_FORMAT(NOW(),'%Y%m%d') AS SIGNED INTEGER)	|	cast(DATE_FORMAT(NOW(),'%Y%m%d') AS SIGNED INTEGER)	|		|
|	hs_datetime_add(date, int, type)	|	date_add(date, interval int type)	|	date + interval 'int' type	|	date_add(date, interval int type)	|	date_add(date, interval int type)	|		|
|	hs_trimb(str)	|	trim(str)	|	trim(str)	|	trim(str)	|	trim(str)	|		|
|	hs_floor(-1.001)	|	floor(-1.001)	|	floor(-1.001)	|	floor(-1.001)	|	floor(-1.001)	|		|
|	hs_substr('abcd',2,2)	|	substring('abcd',2,2)	|	substr('abcd',2,2)	|	substring('abcd',2,2)	|	substring('abcd',2,2)	|		|
|	hs_ceil(-1.001)	|	ceiling(-1.001)/ceil(-1.001))	|	ceil(-1.001))	|	ceiling(-1.001)/ceil(-1.001))	|	ceiling(-1.001)/ceil(-1.001))	|		|
|	hs_sub_day(now(), N)	|	date_sub(now(), INTERVAL N DAY)	|	sysdate-N	|	date_sub(now(), INTERVAL N DAY)	|	date_sub(now(), INTERVAL N DAY)	|		|
|	hs_concat('111','abc',...)	|	concat('111','abc',...)	|	111'||'abc'||…	|	concat('111','abc',...)	|	concat('111','abc',...)	|		|
|	hs_nvl(u.email_address, 10)	|	ifnull(u.email_address, 10)	|	nvl(u.email_address, 10)	|	ifnull(u.email_address, 10)	|	ifnull(u.email_address, 10)	|		|
|	hs_timestampdiff(unit, datetime1, datetime2)	|	timestampdiff(unit, datetime1, datetime2)	|	oralce: floor((datetime2 - datetime1)*unit_extend)	|	timestampdiff(unit, datetime1, datetime2)	|	timestampdiff(unit, datetime1, datetime2)	|	unit可以为 second, minute, hour, day,unit_extend 需要根据 unit 转化,second 24*60*60/ minute 24*60 /hour 24 /day 1	|
|	hs_number(str)	|	cast(str as signed integer)	|	to_number(str)	|	cast(str as signed integer)	|	cast(str as signed integer)	|		|
|	hs_upper(iv_user_id)	|	upper(iv_user_id)	|	upper(iv_user_id)	|	upper(iv_user_id)	|	upper(iv_user_id)	|		|
|	hs_timestamp_int(N)	|	round(cast(DATE_FORMAT(NOW(N),'%H%i%s%f') AS SIGNED INTEGER) /1000)	|	to_number(to_char(systimestamp, 'HH24MISSffN'))	|	round(cast(DATE_FORMAT(NOW(N),'%H%i%s%f') AS SIGNED INTEGER) /1000)	|	round(cast(DATE_FORMAT(NOW(N),'%H%i%s%f') AS SIGNED INTEGER) /1000)	|		|
|	hs_char(N)	|	char(N)	|	char(N)	|	char(N)	|	char(N)	|		|
|	hs_ascii(str)	|	ascii(str)	|	ascii(str)	|	ascii(str)	|	ascii(str)	|		|
|	hs_instr('sdsq','s',2)	|	instr('sdsq','s')/locate('sdsq','s',2)	|	instr('sdsq','s')/instr('sdsq','s',2)	|	instr('sdsq','s')/locate('sdsq','s',2)	|	instr('sdsq','s')/locate('sdsq','s',2)	|	最后的2可以不填	|
|	hs_add_day(now(), N)	|	date_add(now(), INTERVAL N DAY)	|	sysdate+N	|	date_add(now(), INTERVAL N DAY)	|	date_add(now(), INTERVAL N DAY)	|		|
|	hs_rownum()	|	rownum := @rownum+1	|	rownum	|	rownum := @rownum+1	|	rownum := @rownum+1	|		|
|	hs_date_format(str,mysql_format,oracle_format)	|	date_format(str, mysql_format)	|	tochar(str, oracle_format)	|	date_format(str, mysql_format)	|	date_format(str, mysql_format)	|	不填参数时，str取当前日期，mysql格式为'%Y-%m-%d'，oracle格式为'yyyy-mm-dd'；只有str参数时，mysql格式为'%Y-%m-%d'，oracle格式为'yyyy-mm-dd'；三个参数都填且值不为空时，使用用户所填格式，为空采用默认格式	|
|	hs_replace(str, from, to)	|	replace(str, from, to)	|	replace(str, from, to)	|	replace(str, from, to)	|	replace(str, from, to)	|		|
|	hs_instr_comma(soure_str ,sub_str)>0	|	instr(concat(',',source_str,','), concat(',',sub_str,','))>0	|	instr(','||source_str||',', ','||sub_str||',')>0	|	instr(concat(',',source_str,','), concat(',',sub_str,','))>0	|	instr(concat(',',source_str,','), concat(',',sub_str,','))>0	|	一般要搭配>和<在where条件中使用	|
|	hs_group_concat([distinct] column_name)	|	group_concat([distinct] column_name)	|	listagg([distinct] column_name,',') within group (order by column_name)	|	group_concat([distinct] column_name)	|	group_concat([distinct] column_name)	|	distinct关键字可以不填	|
|	hs_add_month(sysdate, 2)	|	date_add(sysdate(), interval 2 month)	|	add_months(sysdate, 2)	|	date_add(sysdate(), interval 2 month)	|	date_add(sysdate(), interval 2 month)	|		|
|	hs_lower(iv_user_id)	|	lower(iv_user_id)	|	lower(iv_user_id)	|	lower(iv_user_id)	|	lower(iv_user_id)	|		|
|	hs_time_format(str)	|	time_format(str, '%H-%i-%S')	|	tochar(str, 'hh24-mi-ss')	|	time_format(str, '%H-%i-%S')	|	time_format(str, '%H-%i-%S')	|	参数str可以去掉，取当前时间	|
|		|		|		|		|		|		|
|	二目运算	|	num + 4,num - 4,num * 4,num / 4	|	num + 4,num - 4,num * 4,num / 4	|		|		|		|
|	取模	|	mod(num,4)	|	mod(num,4)	|		|		|		|
|	字符串拼接	|	concat(str, str)	|	str||str	|		|		|		|
|	取子串	|	substr(str,3), substr(str,2,3),	|	substr(str,3), substr(str,2,3), substr(str,-1)	|		|		|		|
|		|	substr(str,-1)	|		|		|		|		|
|	字母转大写	|	upper()	|	upper(str)	|		|		|		|
|	字母转小写	|	lower(str)	|	lower(str)	|		|		|		|
|	去除前后空格	|	trim(str)	|	trim(str)	|		|		|		|
|	字符串替换	|	replace(str,'abc','--')	|	replace(str,'abc','--')	|		|		|		|
|	左填充	|	lpad(,10,'x')	|	lpad(str,10,'x')	|		|		|		|
|	右填充	|	rpad(str,10,'x')	|	rpad(str,10,'x')	|		|		|		|
|	取当前时间戳	|	now() 	|	sysdate	|		|		|		|
|	取年	|	EXTRACT(YEAR FROM timestamp)	|	EXTRACT(YEAR FROM timestamp) 	|		|		|		|
|	取月	|	EXTRACT(MONTH FROM timestamp)	|	EXTRACT(MONTH FROM timestamp)	|		|		|		|
|	取日	|	EXTRACT(DAY FROM timestamp) 	|	EXTRACT(DAY FROM timestamp) 	|		|		|		|
|	取时	|	EXTRACT(HOUR FROM timestamp)	|	EXTRACT(HOUR FROM timestamp)	|		|		|		|
|	取分	|	EXTRACT(MINUTE FROM timestamp)	|	EXTRACT(MINUTE FROM timestamp)	|		|		|		|
|	取秒 	|	EXTRACT(SECOND FROM timestamp)	|	EXTRACT(SECOND FROM timestamp)	|		|		|		|
|	日期(时间)格式化	|	DATE_FORMAT(timestamp, '%Y-%m-%d %H:%i:%s') 	|	TO_CHAR(timestamp, 'yyyy-mm-dd hh24:mi:ss') 	|		|		|		|
|	字符串转日期(时间)	|	STR_TO_DATE('2020-01-01 09:34:51', '%Y-%m-%d %H:%i:%s') 	|	TO_TIMESTAMP('2020-01-01 09:34:51', 'yyyy-mm-dd hh24:mi:ss') 	|		|		|		|
|	取日期差	|	DATEDIFF(timestamp, timestamp)	|	ROUND(TO_NUMBER(TO_DATE(TO_CHAR(timestamp, 	|		|		|		|
|		|		|	'yyyy-mm-dd'), 'yyyy-mm-dd') - TO_DATE(TO_CHAR	|		|		|		|
|		|		|	(timestamp, 'yyyy-mm-dd'), 'yyyy-mm-dd')))	|		|		|		|
|	取整(取小数)	|	ROUND(3.1415926), ROUND(3.1415926, 4) 	|	ROUND(3.1415926), ROUND(3.1415926, 4) 	|		|		|		|
|	向下取整	|	FLOOR(3.1415926)	|	FLOOR(3.1415926)	|		|		|		|
|	向上取整	|	CEIL(3.1415926) 	|	CEIL(3.1415926) 	|		|		|		|
|	取随机数	|	RAND()	|	DBMS_RANDOM.VALUE() 	|		|		|		|
|	取对数	|	LOG(10, 1000)	|	LOG(10, 1000)	|		|		|		|
|	指数计算	|	POWER(2, 3)	|	POWER(2, 3)	|		|		|		|
|	开平方计算	|	SQRT(16)	|	SQRT(16)	|		|		|		|
|	取绝对值	|	ABS(-1)	|	ABS(-1)	|		|		|		|
|	三角函数	|	SIN(0.8), ASIN(0.717), COS(0.9), ACOS(0.621) 	|	SIN(0.8), ASIN(0.717), COS(0.9), ACOS(0.621) 	|		|		|		|
|	字符反转	|	REVERSE(str) 	|	REVERSE(str) 	|		|		|		|
|	空值转换	|	IFNULL(str, '-')	|	NVL(str, '-') 	|		|		|		|
|	分组聚合	|	GROUP_CONCAT(str SEPARATOR ',') 	|	LISTAGG(str, ',') WITHIN GROUP (ORDER BY str) 	|		|		|		|
|	取总数	|	COUNT(*)	|	COUNT(*)	|		|		|		|
|	求和	|	SUM(num)	|	SUM(num)	|		|		|		|
|	取最大值	|	MAX(num)	|	MAX(num)	|		|		|		|
|	取最小值	|	MIN(num)	|	MIN(num)	|		|		|		|
|	取平均值	|	AVG(num)	|	AVG(num)	|		|		|		|

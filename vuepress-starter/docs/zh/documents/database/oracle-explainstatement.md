## Oracle ExpLain Statement
1. 启动 SQL*Plus 或 SQL 开发人员，然后以具有必要权限的用户登录数据库
2. 在 SQL 语句之前包括子句。EXPLAIN PLAN FOR
   
下面的示例说明了表查询的计划：employees
```
EXPLAIN PLAN FOR
  SELECT e.last_name, d.department_name, e.salary
  FROM   employees e, departments d
  WHERE  salary < 3000
  AND    e.department_id = d.department_id
  ORDER BY salary DESC;
```
3. 发出语句后，使用 Oracle 数据库提供的脚本或包显示最新的计划表输出。EXPLAIN PLAN

下面的示例使用 函数：DBMS_XPLAN.DISPLAY
```
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(format => 'ALL'));
```
4. 查看计划输出。

例如，以下计划显示哈希联接：
```
SQL> SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY(format => 'ALL'));
Plan hash value: 3556827125

------------------------------------------------------------------------------
| Id | Operation           | Name        |Rows | Bytes |Cost (%CPU)| Time    |
------------------------------------------------------------------------------
|  0 | SELECT STATEMENT    |             |   4 |   124 |   5  (20)| 00:00:01 |
|  1 |  SORT ORDER BY      |             |   4 |   124 |   5  (20)| 00:00:01 |
|* 2 |   HASH JOIN         |             |   4 |   124 |   4   (0)| 00:00:01 |
|* 3 |    TABLE ACCESS FULL| EMPLOYEES   |   4 |    60 |   2   (0)| 00:00:01 |
|  4 |    TABLE ACCESS FULL| DEPARTMENTS |  27 |   432 |   2   (0)| 00:00:01 |
------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   3 - SEL$1 / E@SEL$1
   4 - SEL$1 / D@SEL$1

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("E"."DEPARTMENT_ID"="D"."DEPARTMENT_ID")
   3 - filter("SALARY"<3000)

Column Projection Information (identified by operation id):
-----------------------------------------------------------

   1 - (#keys=1) INTERNAL_FUNCTION("E"."SALARY")[22],
       "E"."LAST_NAME"[VARCHAR2,25], "D"."DEPARTMENT_NAME"[VARCHAR2,30]
   2 - (#keys=1) "E"."LAST_NAME"[VARCHAR2,25], "SALARY"[NUMBER,22],
       "D"."DEPARTMENT_NAME"[VARCHAR2,30], "D"."DEPARTMENT_NAME"[VARCHAR2,30]
   3 - "E"."LAST_NAME"[VARCHAR2,25], "SALARY"[NUMBER,22],
       "E"."DEPARTMENT_ID"[NUMBER,22]
   4 - "D"."DEPARTMENT_ID"[NUMBER,22], "D"."DEPARTMENT_NAME"[VARCHAR2,30]

Note
-----
   - this is an adaptive plan

```
输出中的执行顺序从右侧缩进最远的行开始。下一步是该行的父行。如果两行平缩，则通常首先执行顶行。EXPLAIN PLAN
>注意：本章中解释计划输出中的步骤在您的数据库中可能不同。优化器可以选择不同的执行计划，具体取决于数据库配置。

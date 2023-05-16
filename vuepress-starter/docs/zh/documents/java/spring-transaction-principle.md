# Spring事务实现基本原理
## 使用
```java
@EnableTransactionManagement
```
## 原理
1.解析切面——>bean的创建前第一个bean的后置处理器进行解析advisor(pointcut(通过@Transacational解析的切点)，advise)(这个advisor是通过@EnableTransactionManagement注册了一个配置类，该配置类就配置了adivsor)

2.创建动态代理——>bean的初始化后调用bean的后置处理器进行创建动态代理(有接口使用jdk，没接口使用cglib)，创建动态代理之前会先根据advisor中pointCut匹配@Transacational(方法里面是不是有、类上面是不是有、接口或父类上面是不是有)，匹配到就创建动态代理。

3.调用：动态代理

   try{
   
   4.创建一个数据库连接Connection,并且修改数据库连接的autoCommit属性为false，禁止此连接的自动提交，这是实现Spring事务非常重要的一步
      
   5.然后执行目标方法方法，方法中会执行数据库操作sql
    
   }catch{
         
   6.如果出现了异常，并且这个异常是需要回滚的就会回滚事务，否则仍然提交事务
    
   }

7.执行完当前方法后，如果没有出现异常就直接提交事务
# MyBatis常用工具类
>由于开发工作中，对于sql处理会抽取一些公共处理，常会通过写拦截器的方式去对mybatis的数据库操作进行处理，本文主要还是记录一下MetaObject等工具类。
> 本次记录由来，oracle11g中in查询条件不能超1000，超1000sql会报错，考虑到优雅的操作，处理方式为超过1000的in条件sql，拆分sql解决，拦截器中为了优雅的操作statement，使用了MetaObject
## MetaObject
MetaObject是MyBatis中的反射工具类，该工具类在MyBatis源码中出现的频率非常高。使用MetaObject工具类，我们可以很优雅地获取和设置对象的属性值。
## MetaClass
MetaClass是MyBatis中的反射工具类，与MetaOjbect不同的是，MetaObject用于获取和设置对象的属性值，而MetaClass则用于获取类相关的信息。例如，我们可以使用MetaClass判断某个类是否有默认构造方法，还可以判断类的属性是否有对应的Getter/Setter方法
## ObjectFactory
ObjectFactory是MyBatis中的对象工厂，MyBatis每次创建Mapper映射结果对象的新实例时，都会使用一个对象工厂（ObjectFactory）实例来完成。ObjectFactory接口只有一个默认的实现，即DefaultObjectFactory，默认的对象工厂需要做的仅仅是实例化目标类，要么通过默认构造方法，要么在参数映射存在的时候通过参数构造方法来实例化。
## ProxyFactory
ProxyFactory是MyBatis中的代理工厂，主要用于创建动态代理对象，ProxyFactory接口有两个不同的实现，分别为CglibProxyFactory和JavassistProxyFactory。从实现类的名称可以看出，MyBatis支持两种动态代理策略，分别为Cglib和Javassist动态代理。ProxyFactory主要用于实现MyBatis的懒加载功能。当开启懒加载后，MyBatis创建Mapper映射结果对象后，会通过ProxyFactory创建映射结果对象的代理对象。当我们调用代理对象的Getter方法获取数据时，会执行CglibProxyFactory或JavassistProxyFactory中定义的拦截逻辑，然后执行一次额外的查询
## 本文记录由来的解决方案代码示例
```java
@Component
@Intercepts({@Signature(method = "prepare", type = StatementHandler.class, args = {Connection.class, Integer.class})})
public class MybatisSqlInterceptor implements Interceptor {
    public static final Logger logger = LogManager.getLogger(MybatisSqlInterceptor.class);

    private static final int PARTITION_SIZE = 1000;
    private static final int PARTITION_STRING_LENGTH = 4000;

    /**
     * 数据库配置
     */
    @Value("${hs.datasource.default.driver-class-name}")
    private String DRIVER_CLASS_NAME;

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
        /**
         * 通过MetaObject优雅访问对象的属性，这里是访问statementHandler的属性;
         * MetaObject是Mybatis提供的一个用于方便、优雅访问对象属性的对象，
         * 通过它可以简化代码、不需要try/catch各种reflect异常，同时它支持对JavaBean、Collection、Map三种类型对象的操作。
         */
        MetaObject metaObject = MetaObject
                .forObject(statementHandler, SystemMetaObject.DEFAULT_OBJECT_FACTORY, SystemMetaObject.DEFAULT_OBJECT_WRAPPER_FACTORY,
                        new DefaultReflectorFactory());
        /**
         * 先拦截到RoutingStatementHandler，里面有个StatementHandler类型的delegate变量，其实现类是BaseStatementHandler，然后就到BaseStatementHandler的成员变量mappedStatement
         */
        MappedStatement mappedStatement = (MappedStatement) metaObject.getValue("delegate.mappedStatement");
        /**
         * id为执行的mapper方法的全路径名，如com.uv.dao.UserMapper.insertUser
         */
        String sqlId = mappedStatement.getId();
        /**
         * sql语句类型 select、delete、insert、update
         */
        String sqlCommandType = mappedStatement.getSqlCommandType().toString();
        BoundSql boundSql = statementHandler.getBoundSql();
        /**
         * 获取节点的配置
         */
        Configuration configuration = mappedStatement.getConfiguration();
        Map<String, Object> map = new HashMap<>();
        /**
         * 获取到填好参数的sql语句
         */
        String fillParamSql = showSql(configuration, boundSql, map);
        //...省略后续代码
    }
    //...省略后续方法
}
```
## 使用SQL类生成语句
## 使用ScriptRunner执行脚本
## 使用SqlRunner操作数据库

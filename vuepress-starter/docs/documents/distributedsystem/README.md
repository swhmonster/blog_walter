# 分布式系统
>推荐阅读架构类书目：《凤凰架构：构建可靠的大型分布式系统》周志明
- 透明多级分流系统(Transparent Multilevel Diversion System)
- 微服务框架
    - Dubbo (RPC)
        >传输层将Mina和Netty抽象成了一个接口，默认情况下使用Netty
    - Spring Cloud (REST)
    - Netty
- 注册中心
    >选用方式，可参看文档[《主流注册中心》](./registrycompare.md)
    - Spring Cloud Eureka
        - [官方网站](https://spring.io/projects/spring-cloud)
        - [GitHub](https://github.com/spring-cloud/)
    - Zookeeper
        - [官方网站](https://zookeeper.apache.org/)
        - [GitHub](https://github.com/apache/zookeeper)
    - Nacos（from alibaba）
        - [官方网站](https://nacos.io/zh-cn/index.html)
        - [GitHub](https://github.com/alibaba/nacos)
        >可基于Spring Cloud 2.0+
- 中间件:[参看中间件栏目](../middleware/README.md)
- 网关
    - 网关分类
        - 流量网关
        - 业务网关
    - 开源网关
      - Nginx+Lua:Open Resty、Kong、Orange、Abtesting Gateway等；
      - Java:Zuul/Zuul 2、Spring Cloud Gateway、Kaazing KWG、gravitee、Dromara soul等；
      - Go:Janus、fagongzi、Grpc-Gateway；
      - .NET:Ocelot；
      - Node.js:Express Gateway、MicroGateway。
- 服务熔断与降级
    - Hystrix：
        - [GitHub](https://github.com/Netflix/Hystrix)
- 容器化技术
    - kubernetes
    - docker
- 分布式事务
    - Seata：开源的分布式事务解决方案
        - [官网地址](http://seata.io/zh-cn/docs/overview/what-is-seata.html)
        - [GitHub](https://github.com/seata/seata)

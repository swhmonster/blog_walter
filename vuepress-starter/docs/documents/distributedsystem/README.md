# 分布式系统 
- 大致涉及
    - 服务治理
    - 网关、总链路（日志采集等）
    - 业务支撑
    - 中间件
    - 负载均衡
- 微服务框架
    - Dubbo (RPC)
        >传输层将Mina和Netty抽象成了一个接口，默认情况下使用Netty
    - Spring Cloud (HTTP)
    - Netty
- 注册中心
    >选用方式，可参看文档[《主流注册中心》](./registrycompare.md)
    - Spring Cloud Eureka
        - 官方网站：<https://spring.io/projects/spring-cloud>
        - GitHub：<https://github.com/spring-cloud/>
    - Zookeeper
        - 官方网站：<https://zookeeper.apache.org/>
        - GitHub：<https://github.com/apache/zookeeper>
    - Nacos（from alibaba）
        - 官方网站：<https://nacos.io/zh-cn/index.html>
        - GitHub：<https://github.com/alibaba/nacos>
        >可基于Spring Cloud 2.0+
- 中间件
    >针对中间件相关内容参看“中间件”栏目
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

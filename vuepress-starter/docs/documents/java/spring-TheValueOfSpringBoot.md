# Spring Boot 的价值
## Spring Boot 约定优于配置
约定优于配置（Convention Over Configuration）是一种软件设计范式，目的在于减少配置的数量或者降低理解难度，从而提升开发效率。需要注意的是，它并不是一种新的思想，实际上从我们开始接触Java依赖，就会发现很多地方都有这种思想的体现。比如，数据库中表名的设计对应到Java中实体类的名字，就是一种约定，我们可以从这个实体类的名字知知道它对应数据库中哪张表。再比如，每个公司都会有自己的开发规范，开发者按照开发规范可以在一定程度上减少Bug的数量，增加可读性和可维护性。

在Spring Boot中，约定优于配置的思想主要体现在以下方面（包括但不限于）：
- Maven目录结构的约定。
- Spring Boot默认的配置文件及配置文件中配置属性的约定。
- 对于Spring MVC的依赖，自动依赖内置的Tomcat容器。
- 对于Starter组件自动完成装配。
## Spring Boot的核心
Spring Boot是基于Spring Framework体系来构建的，所以它并没有什么新的东西，但是要想学好Spring Boot，必须知道它的核心：
- Starter组件，提供开箱即用的组件。
- 自动装配，自动根据上下文完成Bean的装配。
- Actuator，Spring Boot应用的监控。
- Spring Boot CLI，基于命令行工具快速构建Spring Boot应用。
 
其中，最核心的部分应该是自动装配，Starter组件的核心部分也是基于自动装配来实现的。

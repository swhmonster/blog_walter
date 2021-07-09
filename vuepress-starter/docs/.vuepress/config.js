module.exports = {
    title: 'Walter\'s WebSite',
    description: 'Just playing around',
    // host: '192.168.162.101',
    // port: 8888,
    repo: 'https://swhmonster.github.io/blog_walter/',
    docsDir: 'docs',
    docsBranch: 'master',
    head: [
        ['link', {rel: 'icon', href: '/Knowledge_Worker.png'}],
        ['script', {},
            `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?565a7b05ee2b4d75932f0afb2c903ed8";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
            `]
    ],
    plugins: [
        [
            '@vuepress/google-analytics',
            {
                'ga': 'G-53QBN9NB6C' // G-53QBN9NB6C UA-00000000-0
            }
        ],
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        '@vuepress/last-updated',
        '@vuepress/plugin-search',
        // 评论插件learncloud-valine
        [
            'vuepress-plugin-comment',
            {
                choosen: 'valine',
                options: {
                    el: '#vuepress-plugin-comment',
                    appId: 'SnvVUUBEcptKHBzHaPukN3K8-9Nh9j0Va',
                    appKey: 'hm5yvGtHSKdChqTy6x96LthP',
                    // 解决切换页面，评论未刷新问题
                    // path:'<%- frontmatter.to.path %>'
                    path: '<%- frontmatter.to.path ?frontmatter.to.path : window.location.pathname %>'
                }
            }
        ]
    ],
    themeConfig: {
        logo: '/logo.png',
        smoothScroll: true,
        lastUpdated: 'Last Updated',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Documents', link: '/documents/'},
            {text: 'Contact', link: '/contact/'},
            {text: 'Downloads', link: 'https://www.waltersun.cn/subsys/', target: '_blank'},
            {text: 'Github', link: 'https://github.com/swhmonster', target: '_blank'},
            {text: 'CSDN Blog', link: 'https://blog.csdn.net/Soul_Programmer_Swh', target: '_blank'},
            {text: 'Donation 打赏', link: '/donation/'},
            {text: 'Message 留言', link: '/leavemsg/'},
            {text: 'Giving 公益', link: '/publicwelfare/'}
        ],
        sidebar: [{
            title: '前沿技术',
            path: '/documents/thoughtworks/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
        }, {
            title: 'Java',
            path: '/documents/java/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '阿里巴巴Java开发手册终极版v1.3.0', path: '/documents/java/alibaba-javadevelop-final-v1.3.0'},
                {title: 'Spring-Spring Boot 的价值', path: '/documents/java/spring-TheValueOfSpringBoot'},
                {title: 'Spring-IOC的bean加载', path: '/documents/java/spring-iocfindbeans'},
                {title: 'Spring-为什么Spring4.0提倡使用构造函数注入方式？', path: '/documents/java/spring-ioc'},
                {title: 'Spring-设计模式在Spring中的应用', path: '/documents/java/spring-desingpartern'},
                {title: 'Spring Boot启动流程简析', path: '/documents/java/springboot-start'},
                {title: 'java-多线程编程核心技术之同步锁1', path: '/documents/java/java-synchronized1'},
                {title: 'java-多线程编程核心技术之同步锁2', path: '/documents/java/java-synchronized2'},
                {title: 'java-JVM调优参数(GC相关)', path: '/documents/java/java-jvmgcparams'},
                {title: 'java-jstack线程分析', path: '/documents/java/jstack'},
                {title: 'java-jconsole远程监控', path: '/documents/java/java-jconsole'},
                {title: 'java-HashMap的设计与优化', path: '/documents/java/java-hashmap'},
                {title: 'java-调试体系', path: '/documents/java/java-debug'},
                {title: 'java-io模型', path: '/documents/java/io'},
                {title: 'java-G1参数介绍和调优', path: '/documents/java/java-g1gc'},
                {title: 'java-jdk8 hashmap加入了红黑树', path: '/documents/java/java-jdk8hashmap'},
                {title: 'java-jdk8 lambda表达式原理', path: '/documents/java/java-lambdaprinciple'},
                {title: 'java-jdk9 新特性', path: '/documents/java/java-java9'},
                {title: 'java-jdk11 新特性', path: '/documents/java/java-java11'},
                {title: 'mybatis-常用工具类', path: '/documents/java/mybatis-commontools'},
                {title: 'swagger注释@API详细说明', path: '/documents/java/swagger-annotation'},
                {title: 'dubbo-api-docs', path: '/documents/java/dubbo-api-docs'}
            ]
        }, {
            title: 'Python',
            path: '/documents/python/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'Python多环境配置管理', path: '/documents/python/python-multisettings'},
                {title: 'Tips for Effective Python', path: '/documents/python/python-TipsforEffectivePython'},
                {title: 'PEP8风格代码规范指南', path: '/documents/python/python-pep8style'},
                {title: '打包python项目，发布到pypi', path: '/documents/python/python-delpoy'},
                {title: 'smtplib带附件邮件发送(python2)', path: '/documents/python/python-emailsend'}
            ]
        }, {
            title: 'Go',
            path: '/documents/go/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
        }, {
            title: '深入理解JVM',
            path: '/documents/javadeep/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '深入理解Java虚拟机(学习笔记)', path: '/documents/javadeep/java-jvmsummary'},
                {title: '深入理解JVM(1)', path: '/documents/javadeep/java-jvm1'},
                {title: '深入理解JVM(2)', path: '/documents/javadeep/java-jvm2'},
                {title: '深入理解JVM(3)', path: '/documents/javadeep/java-jvm3'},
                {title: '深入理解JVM(4)', path: '/documents/javadeep/java-jvm4'},
                {title: '深入理解JVM(5)', path: '/documents/javadeep/java-jvm5'}
            ]
        }, {
            title: '数据库',
            path: '/documents/database/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '常用Sybase命令', path: '/documents/database/sybase-command'},
                {title: '主流数据库兼容性验证', path: '/documents/database/database-compatibility'},
                {title: 'PostgreSQL-执行计划查看方式与计划分析', path: '/documents/database/postgresql-executionplan'},
                {title: 'PostgreSQL-plsql底层对查询类语句的处理', path: '/documents/database/postgresql-underlying1'},
                {title: 'PostgreSQL-底层对查询类语句的处理（优化），以及执行计划生成策略', path: '/documents/database/postgresql-underlying2'},
                {title: 'MySQL-ExpLain Statement', path: '/documents/database/mysql-explainstatement'},
                {title: 'MySQL-Lock', path: '/documents/database/mysql-lock'},
                {title: 'Oracle-ExpLain Statement', path: '/documents/database/oracle-explainstatement'}
            ]
        }, {
            title: '中间件',
            path: '/documents/middleware/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '主流消息中间件对比', path: '/documents/middleware/middlewarecompare'},
                {title: 'rocketmq 集群', path: '/documents/middleware/rocketmq-cluster'},
                {title: 'rabbitmq 集群', path: '/documents/middleware/rabbitmq-cluster'},
                {title: 'kafka总结', path: '/documents/middleware/kafka'},
                {title: 'Apache-Flink分布式流数据流引擎', path: '/documents/middleware/apache-flink'},
                {
                    title: 'Apache-Flink之Checkpoints和Savepoints',
                    path: '/documents/middleware/apache-flink-checksavepoint'
                }
            ]
        }, {
            title: '分布式',
            path: '/documents/distributedsystem/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'Nginx 配置详解', path: '/documents/distributedsystem/nginxconf'},
                {title: 'Nginx 事件驱动模型', path: '/documents/distributedsystem/nginx-eventdriven'},
                {title: 'Nginx 缓存机制', path: '/documents/distributedsystem/nginx-cache'},
                {title: '注册中心-主流注册中心', path: '/documents/distributedsystem/registrycompare'},
                {title: 'zookeeper-基础入门', path: '/documents/distributedsystem/zookeeper'},
                {title: 'zookeeper-分布式锁原理', path: '/documents/distributedsystem/zookeeper-distributedlock'},
                {title: 'Netty-高性能之道', path: '/documents/distributedsystem/netty-highperformance'},
                {title: 'Netty-解决JDK空轮询Bug', path: '/documents/distributedsystem/netty-dealjdkepoll'},
                {title: 'Netty-粘包与拆包', path: '/documents/distributedsystem/netty-stickypackage'},
                {title: 'Netty-分隔符和定长解码器的应用', path: '/documents/distributedsystem/netty-decoder'},
                {title: 'Netty-编解码技术', path: '/documents/distributedsystem/netty-serialization'},
                {title: 'HDFS-数据存储', path: '/documents/distributedsystem/hdfs-storage'},
                {title: '分布式事务', path: '/documents/distributedsystem/distributedtransaction'},
                {title: '分布式可观测性', path: '/documents/distributedsystem/observability'},
                {title: '流量治理', path: '/documents/distributedsystem/trafficmanagement'},
                {title: '透明多级分流系统-客户端缓存', path: '/documents/distributedsystem/tmds-clientcache'},
                {title: '透明多级分流系统-域名解析', path: '/documents/distributedsystem/tmds-dns'},
                {title: '透明多级分流系统-传输链路', path: '/documents/distributedsystem/tmds-transmissionlink'},
                {title: '透明多级分流系统-内容分发网络', path: '/documents/distributedsystem/tmds-contentdeliverynetwork'},
                {title: '透明多级分流系统-负载均衡', path: '/documents/distributedsystem/tmds-loadbalancing'},
                {title: '透明多级分流系统-服务端缓存', path: '/documents/distributedsystem/tmds-serversidecaching'}
            ]
        }, {
            title: '大数据',
            path: '/documents/bigdata/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'Elastic Stack', path: '/documents/bigdata/elasticstask'},
                {title: 'Elasticsearch', path: '/documents/bigdata/elasticsearch'}
            ]
        }, {
            title: '架构设计',
            path: '/documents/architecturedesign/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '领域驱动设计', path: '/documents/architecturedesign/domain-driven-design'},
                {title: '面向对象设计模式', path: '/documents/architecturedesign/designparttern'},
                {title: '幂等设计', path: '/documents/architecturedesign/idempotentdesign'}
            ]
        }, {
            title: '操作系统',
            path: '/documents/operatingsystem/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '常用Linux命令', path: '/documents/operatingsystem/Linux-command'}
            ]
        }, {
            title: '前端开发',
            path: '/documents/webinfo/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '了解浏览器背后的运行机制', path: '/documents/webinfo/inner-browser'},
                {title: '前端页面性能优化', path: '/documents/webinfo/frontend-optimization'},
                {title: 'Vue-devtools的安装与使用', path: '/documents/webinfo/vue-devtools'},
                {title: 'Rollup打包Vue组件库', path: '/documents/webinfo/rollupwebpack'}
            ]
        }, {
            title: 'IDE开发工具',
            path: '/documents/ide/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {
                    title: 'IntelliJ IDEA-代码规范相关插件配置Sonar Lint,Check Style, Find Bugs',
                    path: '/documents/ide/idea-plugins'
                },
                {title: 'IntelliJ IDEA-配置注释模板', path: '/documents/ide/idea-templates'},
                {title: 'IntelliJ IDEA-配置远程调试', path: '/documents/ide/idea-remotedebug'},
                {title: 'IntelliJ IDEA-插件之java内存分析工具(JProfiler)', path: '/documents/ide/idea-jprofiler'},
                {title: 'Lombok-注解', path: '/documents/ide/lombok-annotation'}
            ]
        }, {
            title: '代码管理',
            path: '/documents/codemanagement/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'GitLab-CI-CD介绍和使用', path: '/documents/codemanagement/gitlab-cdci'},
                {title: 'git-常用命令', path: '/documents/codemanagement/git-command'},
                {title: 'git-git fetch与git pull', path: '/documents/codemanagement/git-fetchpulldiff'},
                {title: 'git-日常使用笔记', path: '/documents/codemanagement/git-notes'},
                {title: 'maven配置详解', path: '/documents/codemanagement/maven-settings'},
                {title: 'Gradle Getting Started', path: '/documents/codemanagement/gradle-gettingstarted'}
            ]
        }, {
            title: '信息安全及算法',
            path: '/documents/sercurity/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '加解密算法及国密介绍', path: '/documents/sercurity/encryption-introduction'},
                {title: '国密算法SM3设计原理', path: '/documents/sercurity/sm-sm3'},
                {title: '国密算法SM4设计原理', path: '/documents/sercurity/sm-sm4'},
                {title: '分布式理论基础-Paxos算法', path: '/documents/sercurity/paxos'},
                {title: 'java代码混淆-allator集成', path: '/documents/sercurity/allatori'}
            ]
        }, {
            title: '常见问题分析解决及其他',
            path: '/documents/others/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'Windows远程桌面——网络唤醒配置', path: '/documents/others/wakeonline'},
                {title: '跨域问题分析及解决', path: '/documents/others/crossdomain'},
                {title: '常见js报错问题', path: '/documents/others/web-jsproblem'},
                {title: 'Beyond Compare 4 破解方式', path: '/documents/others/beyondcompare4crak'},
                {title: 'diy装机心得', path: '/documents/others/computer-diy'}
            ]
        }, {
            title: '管理相关',
            path: '/documents/management/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'Objectives and KeyResults', path: '/documents/management/okr'},
                {title: '敏捷开发', path: '/documents/management/agiledevelopment.md'}
            ]
        }, {
            title: '阅读推荐',
            path: '/documents/recommended/',
            collapsable: true,
            sidebarDepth: 1,
            children: []
        }]
    }
}

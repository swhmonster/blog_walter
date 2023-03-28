module.exports = {
    title: 'Walter\'s Website',
    description: 'Just playing around',
    // host: '192.168.162.101',
    // port: 8888,
    repo: 'https://swhmonster.github.io/blog_walter/',
    docsDir: 'docs',
    docsBranch: 'master',
    head: [
        ['link', {rel: 'icon', href: '/waltersun_cn.png'}],
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
        /*[
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
        ]*/
    ],
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
            title: 'Walter\'s Website',
            description: 'Just playing around',
        },
        '/zh/': {
            lang: 'zh-CN',
            title: 'Walter的个人网站',
            description: '技术无止尽'
        }
    },
    themeConfig: {
        locales :{
            '/':{
                logo: '/logo.png',
                selectText: 'Languages',
                label: 'English',
                smoothScroll: true,
                lastUpdated: 'Last Updated',
                nav: [
                    {text: 'Home', link: '/'},
                    {text: 'My Technology Stack', link: '/documents/'},
                    {text: 'Contact', link: '/documents/contact/'},
                    {text: 'Downloads', link: 'https://www.waltersun.cn/subsys/', target: '_blank'},
                    {text: 'Github', link: 'https://github.com/swhmonster', target: '_blank'},
                    {text: 'CSDN Blog', link: 'https://blog.csdn.net/Soul_Programmer_Swh', target: '_blank'},
                    {text: 'Donation', link: '/documents/donation/'},
                    {text: 'Message', link: '/documents/leavemsg/'},
                    {text: 'Giving', link: '/documents/publicwelfare/'}
                ],
                sidebar: [{
                    title: 'Advanced Technology',
                    path: '/documents/thoughtworks/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: []
                },{
                    title: 'Block Chain',
                    path: '/documents/blockchain/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '什么是区块链', path: '/documents/blockchain/blockchain-bitcoins'}
                    ]
                }, {
                    title: 'Java',
                    path: '/documents/java/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '阿里巴巴Java开发手册终极版v1.3.0', path: '/documents/java/alibaba-javadevelop-final-v1.3.0'},
                        {title: 'Spring-IOC的bean加载', path: '/documents/java/spring-iocfindbeans'},
                        {title: 'Spring-为什么Spring4.0提倡使用构造函数注入方式？', path: '/documents/java/spring-ioc'},
                        {title: 'Spring-设计模式在Spring中的应用', path: '/documents/java/spring-desingpartern'},
                        {title: 'Spring Boot 的价值', path: '/documents/java/spring-TheValueOfSpringBoot'},
                        {title: 'Spring Boot 启动流程简析', path: '/documents/java/springboot-start'},
                        {title: 'Spring Boot 配置属性设置优先级', path: '/documents/java/springboot-profilepriority'},
                        {title: 'Effective Java', path: '/documents/java/java-effectivejava'},
                        {title: 'Java多线程编程之同步锁1', path: '/documents/java/java-synchronized1'},
                        {title: 'Java多线程编程之同步锁2', path: '/documents/java/java-synchronized2'},
                        {title: 'Java多线程编程之AQS', path: '/documents/java/java-aqs'},
                        {title: 'Java-Instrumentation 原理', path: '/documents/java/java-Instrumentation'},
                        {title: 'Java-基础故障处理工具', path: '/documents/java/java-jdkcmdtool'},
                        {title: 'Java-jstack线程分析', path: '/documents/java/jstack'},
                        {title: 'Java-jconsole远程监控', path: '/documents/java/java-jconsole'},
                        {title: 'Java-HashMap的设计与优化', path: '/documents/java/java-hashmap'},
                        {title: 'Java-调试体系', path: '/documents/java/java-debug'},
                        {title: 'Java-io模型', path: '/documents/java/io'},
                        {title: 'Java-ZGC', path: '/documents/java/java-zgc'},
                        {title: 'Java-G1参数介绍和调优', path: '/documents/java/java-g1gc'},
                        {title: 'Java-jdk8 hashmap加入了红黑树', path: '/documents/java/java-jdk8hashmap'},
                        {title: 'Java-jdk8 lambda表达式原理', path: '/documents/java/java-lambdaprinciple'},
                        {title: 'Java-jdk9 新特性', path: '/documents/java/java-java9'},
                        {title: 'Java-jdk11 新特性', path: '/documents/java/java-java11'},
                        {title: 'mybatis-常用工具类', path: '/documents/java/mybatis-commontools'}
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
                    children: [
                        {title: '我对 GO 的理解', path: '/documents/go/understandgo'},
                        {title: 'Go 语言有什么不一样', path: '/documents/go/whatisgo'}
                    ]
                }, {
                    title: 'Lua',
                    path: '/documents/lua/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Lua 快速上手', path: '/documents/lua/lua-getstart'}
                    ]
                }, {
                    title: 'Deep understanding of JVM',
                    path: '/documents/javadeep/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'JVM调优参数(GC相关)', path: '/documents/javadeep/java-jvmgcparams'},
                        {title: '深入理解Java虚拟机(学习笔记)', path: '/documents/javadeep/java-jvmsummary'},
                        {title: '深入理解JVM(1)', path: '/documents/javadeep/java-jvm1'},
                        {title: '深入理解JVM(2)', path: '/documents/javadeep/java-jvm2'},
                        {title: '深入理解JVM(3)', path: '/documents/javadeep/java-jvm3'},
                        {title: '深入理解JVM(4)', path: '/documents/javadeep/java-jvm4'},
                        {title: '深入理解JVM(5)', path: '/documents/javadeep/java-jvm5'}
                    ]
                }, {
                    title: 'Database',
                    path: '/documents/database/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '常用Sybase命令', path: '/documents/database/sybase-command'},
                        {title: '主流数据库兼容性验证', path: '/documents/database/database-compatibility'},
                        {title: 'Redis 键空间通知', path: '/documents/database/redis-notifybykeys'},
                        {title: 'Redis 主从复制', path: '/documents/database/redis-master-slave-replication'},
                        {title: 'Redis 持久化', path: '/documents/database/redis-persistence'},
                        {title: 'Redis Streams 介绍', path: '/documents/database/redis-streams'},
                        {title: 'Redis 集群教程', path: '/documents/database/redis-cluster'},
                        {title: 'Redis-分布式锁', path: '/documents/database/redis-distributedlock'},
                        {title: 'PostgreSQL-执行计划查看方式与计划分析', path: '/documents/database/postgresql-executionplan'},
                        {title: 'PostgreSQL-plsql底层对查询类语句的处理', path: '/documents/database/postgresql-underlying1'},
                        {title: 'PostgreSQL-底层对查询类语句的处理（优化），以及执行计划生成策略', path: '/documents/database/postgresql-underlying2'},
                        {title: 'MySQL-ExpLain Statement', path: '/documents/database/mysql-explainstatement'},
                        {title: 'MySQL-Lock', path: '/documents/database/mysql-lock'},
                        {title: 'Oracle-ExpLain Statement', path: '/documents/database/oracle-explainstatement'}
                    ]
                }, {
                    title: 'Middleware',
                    path: '/documents/middleware/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '主流消息中间件对比', path: '/documents/middleware/middlewarecompare'},
                        {title: '消息中间件“重复消费”、“顺序消费”问题', path: '/documents/middleware/repeatconsume'},
                        {title: 'rocketmq 集群', path: '/documents/middleware/rocketmq-cluster'},
                        {title: 'rabbitmq 集群', path: '/documents/middleware/rabbitmq-cluster'},
                        {title: 'kafka 总结', path: '/documents/middleware/kafka'},
                        {title: 'Apache Flink 分布式流数据流引擎', path: '/documents/middleware/apache-flink'},
                        {
                            title: 'Apache Flink 之Checkpoints和Savepoints',
                            path: '/documents/middleware/apache-flink-checksavepoint'
                        }
                    ]
                }, {
                    title: 'Distributed System',
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
                    title: 'Cloud Native & Container Technology',
                    path: '/documents/container/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Docker-基础使用及持续开发', path: '/documents/container/docker-baseuse'},
                        {title: 'Docker-使用Dockerfile创建镜像', path: '/documents/container/dockerfile'}
                    ]
                }, {
                    title: 'Big Data',
                    path: '/documents/bigdata/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Elastic Stack', path: '/documents/bigdata/elasticstask'},
                        {title: 'Elasticsearch', path: '/documents/bigdata/elasticsearch'}
                    ]
                }, {
                    title: 'Architecture Design',
                    path: '/documents/architecturedesign/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '领域驱动设计', path: '/documents/architecturedesign/domain-driven-design'},
                        {title: 'OSGI', path: '/documents/architecturedesign/osgi'},
                        {title: '面向对象设计模式', path: '/documents/architecturedesign/designparttern'},
                        {title: '幂等设计', path: '/documents/architecturedesign/idempotentdesign'}
                    ]
                }, {
                    title: 'Operating System',
                    path: '/documents/operatingsystem/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Linux 常用命令', path: '/documents/operatingsystem/linux-command'},
                        {title: 'Linux 目录结构', path: '/documents/operatingsystem/linux-directorystructure'},
                        {title: 'Linux 启动过程（RHEL 7）', path: '/documents/operatingsystem/linux-startprocess'},
                        {title: 'Linux 动态主机配置协议 DHCP', path: '/documents/operatingsystem/linux-dhcp'},
                        {title: 'Linux 性能检测与优化', path: '/documents/operatingsystem/linux-PerformanceTesting&Optimization'},
                        {title: 'Linux Shell Bash Demo', path: '/documents/operatingsystem/linux-shelldemo'},
                        {title: '性能分析命令', path: '/documents/operatingsystem/linux&windows-jdkanalysis'},
                        {title: 'sftp 基础使用', path: '/documents/operatingsystem/sftpusage'}
                    ]
                }, {
                    title: 'Web',
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
                    title: 'IDE Development Tools',
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
                    title: 'Code Management',
                    path: '/documents/codemanagement/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'GitLab-CI-CD介绍和使用', path: '/documents/codemanagement/gitlab-cdci'},
                        {title: 'git-常用命令', path: '/documents/codemanagement/git-command'},
                        {title: 'git-git fetch与git pull', path: '/documents/codemanagement/git-fetchpulldiff'},
                        {title: 'git-日常使用笔记', path: '/documents/codemanagement/git-notes'},
                        {title: 'maven配置详解', path: '/documents/codemanagement/maven-settings'},
                        {title: 'Gradle Getting Started', path: '/documents/codemanagement/gradle-gettingstarted'},
                        {title: 'swagger注释@API详细说明', path: '/documents/codemanagement/swagger-annotation'},
                        {title: 'dubbo-api-docs', path: '/documents/codemanagement/dubbo-api-docs'}
                    ]
                }, {
                    title: 'Information Security & Arithmetic',
                    path: '/documents/sercurity/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '加解密算法及国密介绍', path: '/documents/sercurity/encryption-introduction'},
                        {title: '国密算法SM3设计原理', path: '/documents/sercurity/sm-sm3'},
                        {title: '国密算法SM4设计原理', path: '/documents/sercurity/sm-sm4'},
                        {title: '分布式理论基础-Paxos算法', path: '/documents/sercurity/paxos'},
                        {title: 'ZooKeeper ZAB', path: '/documents/sercurity/zookeeper-zab'},
                        {title: 'Raft', path: '/documents/sercurity/raft'},
                        {title: 'java代码混淆-allator集成', path: '/documents/sercurity/allatori'}
                    ]
                }, {
                    title: 'Solutions & Others',
                    path: '/documents/others/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'JProfiler分析dump文件（.hprof）', path: '/documents/others/jprofiler-analysis'},
                        {title: 'Windows远程桌面——网络唤醒配置', path: '/documents/others/wakeonline'},
                        {title: '跨域问题分析及解决', path: '/documents/others/crossdomain'},
                        {title: '常见js报错问题', path: '/documents/others/web-jsproblem'},
                        {title: 'Beyond Compare 4 破解方式', path: '/documents/others/beyondcompare4crak'},
                        {title: 'diy装机心得', path: '/documents/others/computer-diy'}
                    ]
                }, {
                    title: 'Project Management',
                    path: '/documents/management/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Objectives and KeyResults', path: '/documents/management/okr'},
                        {title: '敏捷开发', path: '/documents/management/agiledevelopment.md'}
                    ]
                }, {
                    title: 'Recommended Reading',
                    path: '/documents/recommended/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: []
                }]
            },
            '/zh/':{
                logo: '/logo.png',
                // 多语言下拉菜单的标题
                selectText: '选择语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                smoothScroll: true,
                lastUpdated: '最近更新时间',
                nav: [
                    {text: '主页', link: '/zh/'},
                    {text: '个人技术栈', link: '/zh/documents/'},
                    {text: '联系', link: '/zh/documents/contact/'},
                    {text: '下载', link: 'https://www.waltersun.cn/subsys/', target: '_blank'},
                    {text: 'Github', link: 'https://github.com/swhmonster', target: '_blank'},
                    {text: 'CSDN博客', link: 'https://blog.csdn.net/Soul_Programmer_Swh', target: '_blank'},
                    {text: '打赏', link: '/zh/documents/donation/'},
                    {text: '留言', link: '/zh/documents/leavemsg/'},
                    {text: '公益', link: '/zh/documents/publicwelfare/'}
                ],
                sidebar: [{
                    title: '前沿技术',
                    path: '/zh/documents/thoughtworks/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: []
                },{
                    title: '区块链',
                    path: '/zh/documents/blockchain/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '什么是区块链', path: '/zh/documents/blockchain/blockchain-bitcoins'}
                    ]
                }, {
                    title: 'Java',
                    path: '/zh/documents/java/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '阿里巴巴Java开发手册终极版v1.3.0', path: '/zh/documents/java/alibaba-javadevelop-final-v1.3.0'},
                        {title: 'Spring-IOC的bean加载', path: '/zh/documents/java/spring-iocfindbeans'},
                        {title: 'Spring-为什么Spring4.0提倡使用构造函数注入方式？', path: '/zh/documents/java/spring-ioc'},
                        {title: 'Spring-设计模式在Spring中的应用', path: '/zh/documents/java/spring-desingpartern'},
                        {title: 'Spring Boot 的价值', path: '/zh/documents/java/spring-TheValueOfSpringBoot'},
                        {title: 'Spring Boot 启动流程简析', path: '/zh/documents/java/springboot-start'},
                        {title: 'Spring Boot 配置属性设置优先级', path: '/zh/documents/java/springboot-profilepriority'},
                        {title: 'Effective Java', path: '/zh/documents/java/java-effectivejava'},
                        {title: 'Java多线程编程之同步锁1', path: '/zh/documents/java/java-synchronized1'},
                        {title: 'Java多线程编程之同步锁2', path: '/zh/documents/java/java-synchronized2'},
                        {title: 'Java多线程编程之AQS', path: '/zh/documents/java/java-aqs'},
                        {title: 'Java-Instrumentation 原理', path: '/zh/documents/java/java-Instrumentation'},
                        {title: 'Java-基础故障处理工具', path: '/zh/documents/java/java-jdkcmdtool'},
                        {title: 'Java-jstack线程分析', path: '/zh/documents/java/jstack'},
                        {title: 'Java-jconsole远程监控', path: '/zh/documents/java/java-jconsole'},
                        {title: 'Java-HashMap的设计与优化', path: '/zh/documents/java/java-hashmap'},
                        {title: 'Java-调试体系', path: '/zh/documents/java/java-debug'},
                        {title: 'Java-io模型', path: '/zh/documents/java/io'},
                        {title: 'Java-ZGC', path: '/zh/documents/java/java-zgc'},
                        {title: 'Java-G1参数介绍和调优', path: '/zh/documents/java/java-g1gc'},
                        {title: 'Java-jdk8 hashmap加入了红黑树', path: '/zh/documents/java/java-jdk8hashmap'},
                        {title: 'Java-jdk8 lambda表达式原理', path: '/zh/documents/java/java-lambdaprinciple'},
                        {title: 'Java-jdk9 新特性', path: '/zh/documents/java/java-java9'},
                        {title: 'Java-jdk11 新特性', path: '/zh/documents/java/java-java11'},
                        {title: 'mybatis-常用工具类', path: '/zh/documents/java/mybatis-commontools'}
                    ]
                }, {
                    title: 'Python',
                    path: '/zh/documents/python/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Python多环境配置管理', path: '/zh/documents/python/python-multisettings'},
                        {title: 'Tips for Effective Python', path: '/zh/documents/python/python-TipsforEffectivePython'},
                        {title: 'PEP8风格代码规范指南', path: '/zh/documents/python/python-pep8style'},
                        {title: '打包python项目，发布到pypi', path: '/zh/documents/python/python-delpoy'},
                        {title: 'smtplib带附件邮件发送(python2)', path: '/zh/documents/python/python-emailsend'}
                    ]
                }, {
                    title: 'Go',
                    path: '/zh/documents/go/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '我对 GO 的理解', path: '/zh/documents/go/understandgo'},
                        {title: 'Go 语言有什么不一样', path: '/zh/documents/go/whatisgo'}
                    ]
                }, {
                    title: 'Lua',
                    path: '/zh/documents/lua/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Lua 快速上手', path: '/zh/documents/lua/lua-getstart'}
                    ]
                }, {
                    title: '深入理解JVM',
                    path: '/zh/documents/javadeep/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'JVM调优参数(GC相关)', path: '/zh/documents/javadeep/java-jvmgcparams'},
                        {title: '深入理解Java虚拟机(学习笔记)', path: '/zh/documents/javadeep/java-jvmsummary'},
                        {title: '深入理解JVM(1)', path: '/zh/documents/javadeep/java-jvm1'},
                        {title: '深入理解JVM(2)', path: '/zh/documents/javadeep/java-jvm2'},
                        {title: '深入理解JVM(3)', path: '/zh/documents/javadeep/java-jvm3'},
                        {title: '深入理解JVM(4)', path: '/zh/documents/javadeep/java-jvm4'},
                        {title: '深入理解JVM(5)', path: '/zh/documents/javadeep/java-jvm5'}
                    ]
                }, {
                    title: '数据库',
                    path: '/zh/documents/database/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '常用Sybase命令', path: '/zh/documents/database/sybase-command'},
                        {title: '主流数据库兼容性验证', path: '/zh/documents/database/database-compatibility'},
                        {title: 'Redis 键空间通知', path: '/zh/documents/database/redis-notifybykeys'},
                        {title: 'Redis 主从复制', path: '/zh/documents/database/redis-master-slave-replication'},
                        {title: 'Redis 持久化', path: '/zh/documents/database/redis-persistence'},
                        {title: 'Redis Streams 介绍', path: '/zh/documents/database/redis-streams'},
                        {title: 'Redis 集群教程', path: '/zh/documents/database/redis-cluster'},
                        {title: 'Redis-分布式锁', path: '/zh/documents/database/redis-distributedlock'},
                        {title: 'PostgreSQL-执行计划查看方式与计划分析', path: '/zh/documents/database/postgresql-executionplan'},
                        {title: 'PostgreSQL-plsql底层对查询类语句的处理', path: '/zh/documents/database/postgresql-underlying1'},
                        {title: 'PostgreSQL-底层对查询类语句的处理（优化），以及执行计划生成策略', path: '/zh/documents/database/postgresql-underlying2'},
                        {title: 'MySQL-ExpLain Statement', path: '/zh/documents/database/mysql-explainstatement'},
                        {title: 'MySQL-Lock', path: '/zh/documents/database/mysql-lock'},
                        {title: 'Oracle-ExpLain Statement', path: '/zh/documents/database/oracle-explainstatement'}
                    ]
                }, {
                    title: '中间件',
                    path: '/zh/documents/middleware/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '主流消息中间件对比', path: '/zh/documents/middleware/middlewarecompare'},
                        {title: '消息中间件“重复消费”、“顺序消费”问题', path: '/zh/documents/middleware/repeatconsume'},
                        {title: 'rocketmq 集群', path: '/zh/documents/middleware/rocketmq-cluster'},
                        {title: 'rabbitmq 集群', path: '/zh/documents/middleware/rabbitmq-cluster'},
                        {title: 'kafka 总结', path: '/zh/documents/middleware/kafka'},
                        {title: 'Apache Flink 分布式流数据流引擎', path: '/zh/documents/middleware/apache-flink'},
                        {
                            title: 'Apache Flink 之Checkpoints和Savepoints',
                            path: '/zh/documents/middleware/apache-flink-checksavepoint'
                        }
                    ]
                }, {
                    title: '分布式',
                    path: '/zh/documents/distributedsystem/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Nginx 配置详解', path: '/zh/documents/distributedsystem/nginxconf'},
                        {title: 'Nginx 事件驱动模型', path: '/zh/documents/distributedsystem/nginx-eventdriven'},
                        {title: 'Nginx 缓存机制', path: '/zh/documents/distributedsystem/nginx-cache'},
                        {title: '注册中心-主流注册中心', path: '/zh/documents/distributedsystem/registrycompare'},
                        {title: 'zookeeper-基础入门', path: '/zh/documents/distributedsystem/zookeeper'},
                        {title: 'zookeeper-分布式锁原理', path: '/zh/documents/distributedsystem/zookeeper-distributedlock'},
                        {title: 'Netty-高性能之道', path: '/zh/documents/distributedsystem/netty-highperformance'},
                        {title: 'Netty-解决JDK空轮询Bug', path: '/zh/documents/distributedsystem/netty-dealjdkepoll'},
                        {title: 'Netty-粘包与拆包', path: '/zh/documents/distributedsystem/netty-stickypackage'},
                        {title: 'Netty-分隔符和定长解码器的应用', path: '/zh/documents/distributedsystem/netty-decoder'},
                        {title: 'Netty-编解码技术', path: '/zh/documents/distributedsystem/netty-serialization'},
                        {title: 'HDFS-数据存储', path: '/zh/documents/distributedsystem/hdfs-storage'},
                        {title: '分布式事务', path: '/zh/documents/distributedsystem/distributedtransaction'},
                        {title: '分布式可观测性', path: '/zh/documents/distributedsystem/observability'},
                        {title: '流量治理', path: '/zh/documents/distributedsystem/trafficmanagement'},
                        {title: '透明多级分流系统-客户端缓存', path: '/zh/documents/distributedsystem/tmds-clientcache'},
                        {title: '透明多级分流系统-域名解析', path: '/zh/documents/distributedsystem/tmds-dns'},
                        {title: '透明多级分流系统-传输链路', path: '/zh/documents/distributedsystem/tmds-transmissionlink'},
                        {title: '透明多级分流系统-内容分发网络', path: '/zh/documents/distributedsystem/tmds-contentdeliverynetwork'},
                        {title: '透明多级分流系统-负载均衡', path: '/zh/documents/distributedsystem/tmds-loadbalancing'},
                        {title: '透明多级分流系统-服务端缓存', path: '/zh/documents/distributedsystem/tmds-serversidecaching'}
                    ]
                }, {
                    title: '云原生&容器技术',
                    path: '/zh/documents/container/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Docker-基础使用及持续开发', path: '/zh/documents/container/docker-baseuse'},
                        {title: 'Docker-使用Dockerfile创建镜像', path: '/zh/documents/container/dockerfile'}
                    ]
                }, {
                    title: '大数据',
                    path: '/zh/documents/bigdata/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Elastic Stack', path: '/zh/documents/bigdata/elasticstask'},
                        {title: 'Elasticsearch', path: '/zh/documents/bigdata/elasticsearch'}
                    ]
                }, {
                    title: '架构设计',
                    path: '/zh/documents/architecturedesign/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '领域驱动设计', path: '/zh/documents/architecturedesign/domain-driven-design'},
                        {title: 'OSGI', path: '/zh/documents/architecturedesign/osgi'},
                        {title: '面向对象设计模式', path: '/zh/documents/architecturedesign/designparttern'},
                        {title: '幂等设计', path: '/zh/documents/architecturedesign/idempotentdesign'}
                    ]
                }, {
                    title: '操作系统',
                    path: '/zh/documents/operatingsystem/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Linux 常用命令', path: '/zh/documents/operatingsystem/linux-command'},
                        {title: 'Linux 目录结构', path: '/zh/documents/operatingsystem/linux-directorystructure'},
                        {title: 'Linux 启动过程（RHEL 7）', path: '/zh/documents/operatingsystem/linux-startprocess'},
                        {title: 'Linux 动态主机配置协议 DHCP', path: '/zh/documents/operatingsystem/linux-dhcp'},
                        {title: 'Linux 性能检测与优化', path: '/zh/documents/operatingsystem/linux-PerformanceTesting&Optimization'},
                        {title: 'Linux Shell Bash Demo', path: '/documents/operatingsystem/linux-shelldemo'},
                        {title: '性能分析命令', path: '/zh/documents/operatingsystem/linux&windows-jdkanalysis'},
                        {title: 'sftp 基础使用', path: '/zh/documents/operatingsystem/sftpusage'}
                    ]
                }, {
                    title: '前端开发',
                    path: '/zh/documents/webinfo/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '了解浏览器背后的运行机制', path: '/zh/documents/webinfo/inner-browser'},
                        {title: '前端页面性能优化', path: '/zh/documents/webinfo/frontend-optimization'},
                        {title: 'Vue-devtools的安装与使用', path: '/zh/documents/webinfo/vue-devtools'},
                        {title: 'Rollup打包Vue组件库', path: '/zh/documents/webinfo/rollupwebpack'}
                    ]
                }, {
                    title: 'IDE开发工具',
                    path: '/zh/documents/ide/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {
                            title: 'IntelliJ IDEA-代码规范相关插件配置Sonar Lint,Check Style, Find Bugs',
                            path: '/zh/documents/ide/idea-plugins'
                        },
                        {title: 'IntelliJ IDEA-配置注释模板', path: '/zh/documents/ide/idea-templates'},
                        {title: 'IntelliJ IDEA-配置远程调试', path: '/zh/documents/ide/idea-remotedebug'},
                        {title: 'IntelliJ IDEA-插件之java内存分析工具(JProfiler)', path: '/zh/documents/ide/idea-jprofiler'},
                        {title: 'Lombok-注解', path: '/zh/documents/ide/lombok-annotation'}
                    ]
                }, {
                    title: '代码管理',
                    path: '/zh/documents/codemanagement/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'GitLab-CI-CD介绍和使用', path: '/zh/documents/codemanagement/gitlab-cdci'},
                        {title: 'git-常用命令', path: '/zh/documents/codemanagement/git-command'},
                        {title: 'git-git fetch与git pull', path: '/zh/documents/codemanagement/git-fetchpulldiff'},
                        {title: 'git-日常使用笔记', path: '/zh/documents/codemanagement/git-notes'},
                        {title: 'maven配置详解', path: '/zh/documents/codemanagement/maven-settings'},
                        {title: 'Gradle Getting Started', path: '/zh/documents/codemanagement/gradle-gettingstarted'},
                        {title: 'swagger注释@API详细说明', path: '/zh/documents/codemanagement/swagger-annotation'},
                        {title: 'dubbo-api-docs', path: '/zh/documents/codemanagement/dubbo-api-docs'}
                    ]
                }, {
                    title: '信息安全及算法',
                    path: '/zh/documents/sercurity/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: '加解密算法及国密介绍', path: '/zh/documents/sercurity/encryption-introduction'},
                        {title: '国密算法SM3设计原理', path: '/zh/documents/sercurity/sm-sm3'},
                        {title: '国密算法SM4设计原理', path: '/zh/documents/sercurity/sm-sm4'},
                        {title: '分布式理论基础-Paxos算法', path: '/zh/documents/sercurity/paxos'},
                        {title: 'ZooKeeper ZAB', path: '/zh/documents/sercurity/zookeeper-zab'},
                        {title: 'Raft', path: '/zh/documents/sercurity/raft'},
                        {title: 'java代码混淆-allator集成', path: '/zh/documents/sercurity/allatori'}
                    ]
                }, {
                    title: '问题分析解决及其他',
                    path: '/zh/documents/others/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'JProfiler分析dump文件（.hprof）', path: '/zh/documents/others/jprofiler-analysis'},
                        {title: 'Windows远程桌面——网络唤醒配置', path: '/zh/documents/others/wakeonline'},
                        {title: '跨域问题分析及解决', path: '/zh/documents/others/crossdomain'},
                        {title: '常见js报错问题', path: '/zh/documents/others/web-jsproblem'},
                        {title: 'Beyond Compare 4 破解方式', path: '/zh/documents/others/beyondcompare4crak'},
                        {title: 'diy装机心得', path: '/zh/documents/others/computer-diy'}
                    ]
                }, {
                    title: '管理相关',
                    path: '/zh/documents/management/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: [
                        {title: 'Objectives and KeyResults', path: '/zh/documents/management/okr'},
                        {title: '敏捷开发', path: '/zh/documents/management/agiledevelopment.md'}
                    ]
                }, {
                    title: '阅读推荐',
                    path: '/zh/documents/recommended/',
                    collapsable: true,
                    sidebarDepth: 1,
                    children: []
                }]
            }
        }
    }
}

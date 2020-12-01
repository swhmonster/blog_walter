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
        ]
    ],
    themeConfig: {
        // lastUpdated: 'Last Updated',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Documents', link: '/documents/'},
            {text: 'Contact', link: '/contact/'},
            {text: 'Github', link: 'https://github.com/swhmonster', target: '_blank'},
            {text: 'CSDN Blog', link: 'https://google.com', target: '_blank'},
        ],
        sidebar: [{
            title: 'Java',
            path: '/documents/java/',
            collapsable: true,
            sidebarDepth: 0,
            children: [
                {title: '阿里巴巴Java开发手册终极版v1.3.0', path: '/documents/java/alibaba-javadevelop-final-v1.3.0'},
                {title: 'Spring-IOC的bean加载', path: '/documents/java/spring-iocfindbeans'},
                {title: 'Spring-为什么Spring4.0提倡使用构造函数注入方式？', path: '/documents/java/spring-ioc'},
                {title: 'Spring-设计模式在Spring中的应用', path: '/documents/java/spring-desingpartern'},
                {title: 'Spring Boot启动流程简析', path: '/documents/java/springboot-start'},
                {title: 'java-多线程编程核心技术之同步锁1', path: '/documents/java/java-synchronized1'},
                {title: 'java-多线程编程核心技术之同步锁2', path: '/documents/java/java-synchronized2'},
                {title: 'java-jstack线程分析', path: '/documents/java/jstack'},
                {title: 'java-jconsole远程监控', path: '/documents/java/java-jconsole'},
                {title: 'java-HashMap的设计与优化', path: '/documents/java/java-hashmap'},
                {title: 'java-调试体系', path: '/documents/java/java-debug'},
                {title: 'java-io模型', path: '/documents/java/io'},
                {title: 'java-jdk8 hashmap加入了红黑树', path: '/documents/java/java-jdk8hashmap'},
                {title: 'java-jdk8 lambda表达式原理', path: '/documents/java/java-lambdaprinciple'},
                {title: 'java-jdk9 新特性', path: '/documents/java/java-java9'},
                {title: 'java-jdk11 新特性', path: '/documents/java/java-java11'},
                {title: 'swagger注释@API详细说明', path: '/documents/java/swagger-annotation'}
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
                {title: '打包python项目，发布到pypi', path: '/documents/python/python-delpoy'}
            ]
        }, {
            title: '深入理解JVM',
            path: '/documents/javadeep/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
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
                {title: 'Oracle-ExpLain Statement', path: '/documents/database/oracle-explainstatement'}
            ]
        }, {
            title: '中间件',
            path: '/documents/middleware/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'rocketmq集群', path: '/documents/middleware/rocketmq-cluster'}
            ]
        }, {
            title: '分布式',
            path: '/documents/distributedsystem/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '注册中心-主流注册中心', path: '/documents/distributedsystem/registrycompare'},
                {title: 'zookeeper-基础入门', path: '/documents/distributedsystem/zookeeper'},
                {title: 'zookeeper-分布式锁原理', path: '/documents/distributedsystem/zookeeper-distributedlock'},
                {title: 'Apache-Flink分布式流数据流引擎', path: '/documents/distributedsystem/apache-flink'},
                {title: 'Apache-Flink之Checkpoints和Savepoints简介', path: '/documents/distributedsystem/apache-flink-checksavepoint'}
            ]
        },{
            title: '架构设计',
            path: '/documents/architecturedesign/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
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
                {title: 'Vue-devtools的安装与使用', path: '/documents/webinfo/vue-devtools'}
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
                {title: 'java代码混淆之allator集成', path: '/documents/sercurity/allatori'}
            ]
        }, {
            title: '常见问题分析解决及其他',
            path: '/documents/others/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '跨域问题分析及解决', path: '/documents/others/crossdomain'},
                {title: '常见js报错问题', path: '/documents/others/web-jsproblem'},
                {title: 'Beyond Compare 4 破解方式', path: '/documents/others/beyondcompare4crak'},
                {title: 'diy装机心得', path: '/documents/others/computer-diy'}
            ]
        }]
    }
}

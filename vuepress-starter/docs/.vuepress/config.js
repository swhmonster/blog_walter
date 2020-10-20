module.exports = {
    title: 'Walter\'s WebSite',
    description: 'Just playing around',
    // host: '192.168.162.101',
    // port: 8888,
    repo: 'https://swhmonster.github.io/blog_walter/',
    docsDir: 'docs',
    docsBranch: 'master',
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Github', link: 'https://github.com/swhmonster', target: '_blank'},
            {text: 'CSDN Blog', link: 'https://google.com', target: '_blank'},
        ],
        sidebar: [{
            title: 'Java',
            path: '/java/',
            collapsable: true,
            sidebarDepth: 0,
            children: [
                {title: 'jstack线程分析', path: '/java/jstack'},
                {title: 'java调试体系', path: '/java/java-debug'},
                {title: 'java io 模型', path: '/java/io'},
                {title: 'Java多线程编程核心技术之同步锁（1）', path: '/java/java-synchronized1'},
                {title: 'Java多线程编程核心技术之同步锁（2）', path: '/java/java-synchronized2'},
                {title: 'jconsole远程监控', path: '/java/java-jconsole'},
                {title: 'swagger注释@API详细说明', path: '/java/swagger-annotation'},
                {title: 'Spring依赖注入方式，为什么Spring4.0提倡使用构造函数注入方式？', path: '/java/spring-ioc'},
                {title: '详解设计模式在 Spring 中的应用', path: '/java/spring-desingpartern'}
            ]
        }, {
            title: 'Python',
            path: '/python/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'Tips for Effective Python', path: '/python/python-TipsforEffectivePython'},
                {title: 'python——PEP8风格代码规范指南', path: '/python/python-pep8style'},
                {title: '打包python项目，发布到pypi', path: '/python/python-delpoy'}
            ]
        }, {
            title: '深入理解JVM',
            path: '/javadeep/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '深入理解JVM(1)', path: '/javadeep/java-jvm1'},
                {title: '深入理解JVM(2)', path: '/javadeep/java-jvm2'},
                {title: '深入理解JVM(3)', path: '/javadeep/java-jvm3'},
                {title: '深入理解JVM(4)', path: '/javadeep/java-jvm4'},
                {title: '深入理解JVM(5)', path: '/javadeep/java-jvm5'}
            ]
        }, {
            title: '数据库',
            path: '/database/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '常用Sybase命令', path: '/database/sybase-command'},
                {title: 'postgresql——执行计划查看方式与计划分析', path: '/database/postgresql-executionplan'},
                {title: 'postgresql——posgresql底层对查询类语句的处理', path: '/database/postgresql-underlying1'},
                {title: 'postgresql——底层对查询类语句的处理（优化），以及执行计划生成策略', path: '/database/postgresql-underlying2'}
            ]
        }, {
            title: '中间件',
            path: '/middleware/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'rocketmq集群', path: '/middleware/rocketmq-cluster'}
            ]
        }, {
            title: '操作系统',
            path: '/operatingsystem/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '常用Linux命令', path: '/operatingsystem/Linux-command'}
            ]
        }, {
            title: '前端开发',
            path: '/webinfo/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: '了解浏览器背后的运行机制', path: '/webinfo/inner-browser'}

            ]
        }, {
            title: 'IDE开发工具',
            path: '/ide/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'IntelliJ IDEA——代码规范相关插件配置Sonar Lint,Check Style, Find Bugs', path: '/ide/idea-plugins'},
                {title: 'IntelliJ IDEA——配置注释模板', path: '/ide/idea-templates'},
                {title: 'IntelliJ IDEA——配置远程调试', path: '/ide/idea-remotedebug'},
                {title: 'IntelliJ IDEA——插件之java内存分析工具(JProfiler)', path: '/ide/idea-jprofiler'}
            ]
        }, {
            title: '代码管理',
            path: '/codemanagement/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'GitLab-CI-CD介绍和使用', path: '/codemanagement/gitlab-cdci'}
            ]
        }, {
            title: '信息安全',
            path: '/sercurity/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'java代码混淆之allator集成', path: '/sercurity/allatori'}
            ]
        }, {
            title: '其他',
            path: '/others/',
            collapsable: true,
            sidebarDepth: 1,
            children: [
                {title: 'diy装机心得', path: '/others/computer-diy'}
            ]
        }]
    }
}
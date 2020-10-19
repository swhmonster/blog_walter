module.exports = {
    title: 'Walter\'s WebSite',
    description: 'Just playing around',
    host: '192.168.162.101',
    port: 8888,
    repo: 'https://swhmonster.github.io/blog_walter/',
    docsDir: 'docs',
    docsBranch: 'master',
    themeConfig: {
        // displayAllHeaders: true,// 默认值：false
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Github', link: 'https://github.com/swhmonster', target: '_blank'},
            {text: 'CSDN Blog', link: 'https://google.com', target: '_blank'},
        ],
        sidebar: [{
            title: 'Java',   // 必要的
            path: '/java/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 0,    // 可选的, 默认值是 1
            children: [
                {title: 'jstack线程分析', path: '/java/jstack'}
            ]
        }, {
            title: 'Python',   // 必要的
            path: '/python/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: 'Tips for Effective Python', path: '/python/python-TipsforEffectivePython'}

            ]
        }, {
            title: '深入理解JVM',   // 必要的
            path: '/javadeep/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: '深入理解JVM(1)', path: '/javadeep/java-jvm1'}
            ]
        }, {
            title: '数据库',   // 必要的
            path: '/database/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: '常用Sybase命令', path: '/database/sybase-command'}
            ]
        }, {
            title: '中间件',   // 必要的
            path: '/middleware/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: 'rocketmq集群', path: '/middleware/rocketmq-cluster'}
            ]
        }, {
            title: '操作系统',   // 必要的
            path: '/operatingsystem/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: '常用Linux命令', path: '/operatingsystem/Linux-command'}
            ]
        }, {
            title: '前端开发',   // 必要的
            path: '/webinfo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: '了解浏览器背后的运行机制', path: '/webinfo/inner-browser'}

            ]
        }, {
            title: 'IDE开发工具',   // 必要的
            path: '/ide/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: 'IntelliJ IDEA——代码规范相关插件配置Sonar Lint,Check Style, Find Bugs', path: '/ide/idea-plugins'},
                {title: 'IntelliJ IDEA——配置注释模板', path: '/ide/idea-templates'},
                {title: 'IntelliJ IDEA——代码规范相关插件配置Sonar Lint,Check Style, Find Bugs', path: '/ide/idea-remotedebug'}
            ]
        }, {
            title: '代码管理',   // 必要的
            path: '/codemanagement/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 1,    // 可选的, 默认值是 1
            children: [
                {title: 'GitLab-CI-CD介绍和使用', path: '/codemanagement/gitlab-cdci'}
            ]
        }]
    }
}
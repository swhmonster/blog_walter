<!-- .vuepress/theme/layouts/GlobalLayout.vue -->
<template>
    <div id="global-layout">
        <component :is="layout"/>
        <footer style="text-align: center;">
            <div style="margin-bottom: 20px">
                <a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2023008337号-1</a>
                <img src="../../public/beian.png" alt="beian icon"/>
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32010602010775"
                   target="_blank">苏公网安备32010602010775号
                </a>
                ©2020-present, waltersun.cn
            </div>
            <img alt="wechat-scan" src="../../public/codescan8cm.jpeg" v-show="flag"
                 style="float: right;height: 150px; width:150px; position:fixed;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); right: 30px;bottom: 80px">
            <img alt="wechat-icon" src="../../public/wechat.png"
                 style="margin-right: 30px;height: 35px;position:fixed;right: 30px;bottom: 30px;"
                 @mouseover="changeIn()" @mouseout="changeOut()">
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false
        }
    },
    computed: {
        layout() {
            if (this.$page.path) {
                if (this.$frontmatter.layout) {
                    // 你也可以像默认的 globalLayout 一样首先检测 layout 是否存在
                    return this.$frontmatter.layout
                }
                return 'Layout'
            }
            return 'NotFound'
        }
    },
    methods: {
        changeIn() {
            this.flag = true;
        },
        changeOut() {
            this.flag = false;
        },
    }
}
</script>
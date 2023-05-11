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
            <div style="margin-right: 30px;height: 35px;position:fixed;right: 30px;bottom: 30px;">
                <img src="../../public/github.png" height="35px"
                     :height="githubIconHeight"
                     :style="{cursor:flag?'hand':'pointer'}"
                     @mouseover="githubChangeIn()" @mouseout="githubChangeOut()"
                     @click="openGithub()"
                     alt>
                <img alt=" wechat-icon" src="../../public/wechat.png"
                     :height="wechatIconHeight"
                     @mouseover="wechatChangeIn()" @mouseout="wechatChangeOut()">
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false,
            sizeFlag: false,
            wechatIconHeight: 35,
            githubIconHeight: 35
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
        wechatChangeIn() {
            this.flag = true;
            this.sizeFlag = true;
            this.wechatIconHeight = 45;
        },
        wechatChangeOut() {
            this.flag = false;
            this.sizeFlag = false;
            this.wechatIconHeight = 35;
        },
        githubChangeIn() {
            this.sizeFlag = true;
            this.githubIconHeight = 45;
        },
        githubChangeOut() {
            this.sizeFlag = false;
            this.githubIconHeight = 35;
        },
        openGithub(){
            window.open("https://github.com/swhmonster","_blank")
        }
    }
}
</script>
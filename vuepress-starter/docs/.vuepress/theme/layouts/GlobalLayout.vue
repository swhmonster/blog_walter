<!-- .vuepress/theme/layouts/GlobalLayout.vue -->
<template>
  <div id="global-layout">
    <component :is="layout"/>
    <footer>
      <div align="center">
        <img src="../../public/codescan8cm.jpeg">
      </div>
      <div align="center">欢迎关注微信订阅号！</div>
    </footer>
  </div>
</template>

<script>
export default {
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
  }
}
</script>

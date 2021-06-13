<template>
  <div class="scroll-con d-flex flex-wrap" :style="{'height':(winHeight-40)+'px'}">

    <v-card
            v-for="item in navList"
            class=" pa-2 card"
            elevation="2"
            height="80"
            @click="openUrl(item.url)"
    >

      <div>【{{item.label}}】</div>
    </v-card>

  </div>
</template>
<script>
  import {shell} from 'electron'

  export default {
    name: 'navList',
    data() {
      return {
        winHeight: document.documentElement.clientHeight,
        navList: [
          {
            label: "Element",
            url: "https://element.faas.ele.me/#/zh-CN/component/installation"
          }, {
            label: "百度翻译",
            url: "https://fanyi.baidu.com/translate"
          },
          {
            label: "CSDN",
            url: "https://www.csdn.net/nav/web"
          },
          {
            label: "Echarts",
            url: "https://echarts.apache.org/examples/zh/index.html"
          },
          {
            label: "掘金",
            url: "https://juejin.cn/"
          },
          {
            label: "github",
            url: "https://github.com/"
          },
          {
            label: "码云gitee",
            url: "https://gitee.com/"
          }, {
            label: "npm",
            url: "https://www.npmjs.com/"
          }, {
            label: "ES6",
            url: "https://es6.ruanyifeng.com/"
          }, {
            label: "vue",
            url: "https://cn.vuejs.org/"
          }, {
            label: "vue-router",
            url: "https://router.vuejs.org/zh/"
          }, {
            label: "vuex",
            url: "https://vuex.vuejs.org/zh/"
          }, {
            label: "vue-cli",
            url: "https://cli.vuejs.org/zh/"
          }, {
            label: "vuetify",
            url: "https://vuetifyjs.com/zh-Hans/getting-started/installation/"
          }, {
            label: "Electron",
            url: "https://www.electronjs.org/docs"
          }, {
            label: "iconfont",
            url: "https://www.iconfont.cn/"
          }, {
            label: "processon",
            url: "https://www.processon.com/"
          }, {
            label: "webpack",
            url: "https://webpack.docschina.org/configuration/"
          }, {
            label: "nodejs",
            url: "https://nodejs.org/en/docs/"
          }, {
            label: "菜鸟教程",
            url: "https://www.runoob.com/"
          }, {
            label: "免费api接口",
            url: "https://api.asilu.com/"
          }, {
            label: "leetcode",
            url: "https://leetcode-cn.com/"
          }, {
            label: "时间戳转换",
            url: "https://tool.lu/timestamp/"
          }, {
            label: "个人博客",
            url: "http://sxlm201215.gitee.io/vuepress-blog/"
          }, {
            label: "个人简历",
            url: "https://1021965843.github.io/#/"
          },
        ],

      }
    },

    methods: {
      openUrl(url) {
        shell.openExternal(url)
      }
    }
  }
</script>
<style scoped>
  .card {
    margin-top: 10px;
    width: 32%;
    cursor: pointer;
  }

  .card:not(:nth-child(3n)) {
    margin-right: calc(4% / 2);
  }

</style>

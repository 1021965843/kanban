<template>
  <v-app :style="{'height':winHeight+'px'}" class="app">
    <Header>WELCOME TO KANBAN MANAGER</Header>
    <div class="d-flex">
      <Aside @onclick_asideMenu="onclick_asideMenu"></Aside>
      <!--    动态加载不同的dialog组件-->
      <router-view style="flex: 1"/>
    </div>

    <firstUse v-if="!filePath"></firstUse>
    <component :is="currentDialog" ref="currentDialog" :visible="visible" @changeVisible="changeVisible"></component>

  </v-app>
</template>

<script>
  import Header from "./components/Header";
  import Aside from "./components/Aside";
  import firstUse from "./components/firstUse";
  import {ipcRenderer} from "electron"
  import {getTags} from "./dataStore"
  import {mapActions} from "vuex"

  export default {
    name: 'App',
    data() {
      return {
        winHeight: document.documentElement.clientHeight,
        dialogFlag: '',
        visible: false
      }
    },
    components: {
      Header,
      Aside,
      firstUse,
      'addDialog': () => import('./components/addDialog'),
      'searchDialog': () => import('./components/searchDialog'),
      'tagDialog': () => import('./components/tagDialog'),
    },
    computed: {
      currentDialog() {
        console.log(this.dialogFlag + 'Dialog')
        return this.dialogFlag + 'Dialog'
      },
      filePath() {
        return localStorage.getItem('filePath')

      }
    },
    methods: {
      ...mapActions([
        'setTags'
      ]),
      onclick_asideMenu(flag) {
        this.dialogFlag = flag;
        this.visible = true;
        this.$nextTick(() => {
          this.$refs.currentDialog && (this.$refs.currentDialog.dialogVisible = true)
        })
      },
      changeVisible(val) {
        this.visible = val
      }
    },
    async created() {
      const tags = await getTags();
      this.setTags(tags)
    },

    mounted() {
      if (localStorage.getItem('filePath')) {
        if (this.$route.path !== '/home') {
          this.$router.push({
            path: "/home"
          })
        }
      }

      //监听网络变化
      window.addEventListener("online", function () {
        console.log("有网络了");
      });
      window.addEventListener("offline", function () {
        const option = {
          title: "提示!",
          body: "网络已经断开，请检查您的网络设置!",
          //  icon: path.join('main-process/favicon2.ico')
        };
        const myNotification = new window.Notification(option.title, option);

        myNotification.onclick = () => {
          console.log("点击了");
        };
      });

      //监听右键菜单

      window.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        //给主进程广播事件   注意this指向

        ipcRenderer.send("contextmenu");
      });

      window.onresize = () => {
        this.winHeight = document.documentElement.clientHeight;
      };
    },
  };
</script>
<style>
  *::-webkit-scrollbar {
    display: none;
  }

  .app {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /*overflow: hidden;*/
  }
</style>

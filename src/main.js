import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import "./plugins/filters"
//时间过滤器
Vue.filter('dateFormat', function (timeStr) {
  const date = new Date(timeStr)

  let Y = date.getFullYear()
  let M = date.getMonth() + 1 + ""
  let D = date.getDate() + ""
  let weekDay = "日一二三四五六".charAt(date.getDay())
  let dateH = (date.getHours() + "").padStart(2, "0");
  let dateM = (date.getMinutes() + "").padStart(2, "0");

  return ` ${Y}/${M}/${D}  星期${weekDay} ${dateH}:${dateM}`
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

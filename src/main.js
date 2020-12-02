import Vue from 'vue'
import App from './App.vue'
import router from './router'

//重置样式表
import '@css/reset.css';

import '@/plugins'
import http from '@/network/request.js'
Vue.prototype.$http = http;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

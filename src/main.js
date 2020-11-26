import Vue from 'vue'
import App from './App.vue'
import router from './router'

//重置样式表
import '@css/reset.css';

import '@/plugins'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

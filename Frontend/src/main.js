import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// Enregistrement de l'adresse de l'API 
Vue.prototype.$hostname = 'http://localhost:3000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify'

import HistogramSlider from 'vue-histogram-slider';
import 'vue-histogram-slider/dist/histogram-slider.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.component(HistogramSlider.name, HistogramSlider);

// Enregistrement de l'adresse de l'API 
Vue.prototype.$hostname = 'http://localhost:3000'

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

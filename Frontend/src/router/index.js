import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Evenement from '../views/Evenement.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/evenement/:id',
    name: 'Evenement',
    component: Evenement
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

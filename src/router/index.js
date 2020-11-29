import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@views/Login/Login.vue');
const Home = () => import('@views/Home/Home.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  },{
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router

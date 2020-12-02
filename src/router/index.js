import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUserToken} from '@/state/token'

const Login = () => import('@views/Login/Login.vue');
const Home = () => import('@views/Home/Home.vue');
const User = () => import('@views/User/User.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/user',
    component: User
  }
]

const router = new VueRouter({
  routes
})

function getSingle(fn, thisArg = null) {
  let result;
  return function (...args) {
    return result || (result = fn.apply(thisArg, args));
  }
}

let guard = (to, from, next) => {
  if(to.fullPath === '/login') {
    next();
  } else if( !getUserToken() ){
    next('/login');
  } else {
    next();
    return true;
  }
}


router.beforeEach(guard);

export default router

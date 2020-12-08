import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUserToken} from '@/state/token'

const Login = () => import('@views/Login/Login.vue');
const Home = () => import('@views/Home/Home.vue');
const Users = () => import('@views/Home/ChildCompos/Users.vue');
const Profile = () => import('@views/Profile/Profile.vue');
const XiaoMi = () => import('@components/XiaoMi/XiaoMi.vue');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      {
        path: 'welcome',
        component: XiaoMi
      }, {
        path: 'users',
        component: Users
      }
    ]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/profile',
    component: Profile
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

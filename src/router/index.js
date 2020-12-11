import Vue from 'vue'
import VueRouter from 'vue-router'
import {getUserToken} from '@/state/token'

const Login = () => import('@views/Login/Login.vue');
const Home = () => import('@views/Home/Home.vue');
const Users = () => import('@components/content/Users/Users.vue');
const Profile = () => import('@views/Profile/Profile.vue');
const XiaoMi = () => import('@components/XiaoMi/XiaoMi.vue');
const Rights = () => import('@components/content/rights/Rights.vue');
const Roles = () => import('@components/content/roles/Roles.vue');

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
        component: XiaoMi,
        meta: { active: 'welcome' }
      }, {
        path: 'users',
        component: Users,
        meta: { active: 'users' }
      }, {
        path: 'rights',
        component: Rights,
        meta: { active: 'rights' }
      }, {
        path: 'roles',
        component: Roles,
        meta: { active: 'roles' }
      }
    ]
  },  {
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


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
export default router

// 路由配置的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

// 解决点击同一路由报错问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replcae = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

// 配置路由
export default new VueRouter({
  // 配置路由
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Home'),
      meta: {show: true}
    },
    {
      name: 'search',
      path: '/search/:keyword?', // ?代表params参数可传可不传
      component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Search'),
      meta: {show: true}
    },
    {
      name: 'register',
      path: '/register',
      component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Register'),
      meta: {show: false}
    },
    {
      name: 'login',
      path: '/login',
      component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Login'),
      meta: {show: false}
    }
  ]
})
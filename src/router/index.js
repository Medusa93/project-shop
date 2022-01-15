// 路由配置的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

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
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回y=0 表示滚动条在最上方
    return { y: 0 }
  }
})
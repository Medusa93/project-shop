// 路由配置的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 解决点击同一路由报错问题
// 重写VueRouter.prototype上的push方法
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}
// 重写VueRouter.prototype上的replace方法
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replcae = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior (to, from, savedPosition) {
    // 返回y=0 表示滚动条在最上方
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  // 如果已经登录
  if(token) {
    // 如果是去登录页 留在首页
    if(to.path == '/login' || to.path == '/register') {
      next('/home')
    }else {
      // 如果登录了 访问的不是登录和注册
      // 登录了且拥有用户信息
      if(name) {
        next()
      }else {
        // 没有用户名 获取用户信息
        try {
           // 获取用户信息成功
           await store.dispatch('getUserInfo')
          //  放行
           next()
        }catch(err) {
           // token失效获 重新登录
           // 清除token
           await store.dispatch('userLogout')
           next('/login')           
        }
      }
    }
  } else {
    // 想要跳转的路由
    const toPath = to.path
    // 未登录 不能去交易相关、支付相关【pay|paySuccess】、个人中心等路由
    // isAuth为true 说明需要登录才能查看
    if(to.meta.isAuth) {
      next(`/login?redirect=${toPath}`)
    }else {
      next()
    }   
  }
})

export default router
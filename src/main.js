import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex
import store from './store'
// 全局引入三级导航
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 三级导航注册为全局组件
Vue.component(TypeNav.name, TypeNav)
// 轮播图注册为全局组件
Vue.component(Carousel.name, Carousel)
// 分页注册为全局组件
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false

// 引入mockServe.js --- mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css';

new Vue({
  // 注册路由
  router,
  store,
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')

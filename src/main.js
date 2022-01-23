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

// 引入api所有方法
import * as API from "@/api"

import { MessageBox } from 'element-ui';
// ElementUI注册组件的一种写法: 挂在到原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import logo from '@/assets/logo.png'
// 注册插件
Vue.use(VueLazyload, {
  loading: logo,
})

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
// 注册插件
Vue.use(myPlugins, {
  name: '123'
})

new Vue({
  // 注册路由
  router,
  store,
  // 全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
}).$mount('#app')

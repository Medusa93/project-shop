<template>
  <div id="app">
   <Header></Header>
   <router-view></router-view>
    <!-- Home Search显示 注册 登录隐藏 -->
   <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    // 派发一个action 获取商品分类三级列表数据 
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>
</style>

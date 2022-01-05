<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "Carousel",
  props: ['list'],
  data() {
    return {};
  },
  watch: {
    // 监听list数据的变化
    list: {
      // 立即监听
      immediate: true,
      handler(newVal, oldVal) {
        // v-for执行结束后才有结构,watch中无法保证是否执行结束
        // nextTick在DOM下次更新 循环结束之后执行回调。在修改数据之后 立即调用这个方法 获取更新后的DOM
        this.$nextTick(() => {
          // 轮播图
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true, // 点击分页器的指示点分页器会控制Swiper切换
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>
<style scoped>
</style>
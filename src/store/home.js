// home模块小仓库
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
const state = {
  // 三级分类数据
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // floor组件数据
  floorList: []
};

const getters = {};

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
};

const actions = {
  // 获取商品分类列表数据
  async categoryList({commit}) {
    const res = await reqCategoryList()
    if(res.code == 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
  // 获取首页轮播图数据
  async getBannerList({commit}) {
    const res = await reqGetBannerList()
    if(res.code == 200) {
      commit('GETBANNERLIST', res.data)
    }   
  },
  // 获取floor组件数据
  async getFloorList({commit}) {
    const res = await reqGetFloorList()
    if(res.code == 200) {
      commit('GETFLOORLIST', res.data)
    }
    // console.log(res.data)
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  mutations,
  actions
}
// 商品详情模块仓库
import { reqGoodsInfo } from "@/api";
const state = {
  goodsInfo: {}
}

const getters = {
  // 路径导航简化数据
  categoryView() {
    return state.goodsInfo.categoryView || {}
  },
  // 简化产品信息数据
  skuInfo() {
    return state.goodsInfo.skuInfo || {}
  },
  // 产品售卖属性简化数据
  spuSaleAttrList() {
    return state.goodsInfo.spuSaleAttrList
  }
}

const mutations = {
  GETGOODINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}

const actions = {
  // 获取商品详情信息
  async getGoodInfo({commit},skuid) {
    let res = await reqGoodsInfo(skuid)
    if(res.code == 200) {
      commit('GETGOODINFO', res.data)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

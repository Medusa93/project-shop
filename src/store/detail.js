// 商品详情模块仓库
import { reqGoodsInfo, reqAddOrUpdateShopCar } from "@/api";
import { getUUID } from '@/utils/uuid'
const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
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
  },
  // 加入购物车
  async reqAddOrUpdateShopCar({commit}, {skuId, skuNum}) {
    let res = await reqAddOrUpdateShopCar(skuId,skuNum)
    if(res.code == 200) {
      // 返回是成功的标记
      return 'ok'
    }else {
      // 返回是失败的标记
      return Promise.reject(new Error('fail'))
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

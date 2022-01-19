import { reqAddressInfo,reqOrderInfo } from "@/api"
import { add } from "lodash"

const state = {
  address: [],
  orderInfo: []
}

const mutations = {
  GETADDRESS(state, address) {
    state.address = address
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}

const actions = {
  // 获取用户地址信息
  async getAddress({commit}) {
    const res = await reqAddressInfo()
    if(res.code == 200) {
      commit("GETADDRESS", res.data)
    }
  },
  // 获取订单交易页信息
  async getOrderInfo({commit}) {
    const res = await reqOrderInfo()
    if(res.code == 200) {
      commit("GETORDERINFO", res.data)
    }
  }
}

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
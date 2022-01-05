// search模块仓库
import { reqGetSearchInfo } from '@/api'
const state = {
  // 搜索数据
  searchList: {}
}

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}

const actions = {
  // 搜索
  // params形参至少是一个空对象
  async getSearchList({commit}, params = {}) {
    const res = await reqGetSearchInfo(params)
    if(res.code == 200) {
      commit('GETSEARCHLIST', res.data)
    }
  }
}

const getters = {
  // state 当前形参 当前仓库的state
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
}

export default {
  state,
  mutations,
  actions,
  getters
}
import { reqShopCartList, deleteCart, updateChecked } from '@/api'

const state = {
  // 购物车数组
  cartList: []
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  // 获取购物车数据
  async getCartList({commit}) {
    const res = await reqShopCartList()
    if(res.code == 200) {
      commit('GETCARTLIST', res.data)
    }
  },
  // 删除购物车某一个产品 
  async deleteCartBySkuId({commit}, skuId) {
    const res = await deleteCart(skuId)
    if(res.code == 200) {
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 修改某个商品勾选状态
  async updateCheckedById({commit}, {skuId, isChecked}) {
    const res = await updateChecked(skuId, isChecked)
    if(res.code == 200) {
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除所有选中的商品
  deleteAllChecked({getters, dispatch}) {
    // 获取全部勾选中的商品
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      // 勾选中的产品一个一个删除
      let promise = item.isChecked == 1? dispatch('deleteCartBySkuId',item.skuId) : ''
      // 将每一次返回的promise添加到数组中
      promiseAll.push(promise)
    })
    // 全部成功结果为成功 有一个失败则结果失败
    return Promise.all(promiseAll)
  },
  // 修改全部商品的状态
  updateAllChecked({state, dispatch}, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked})
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
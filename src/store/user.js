// 登陆和注册仓库
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from '@/api'

 const state = {
  //  验证码
   code: '',
   token: localStorage.getItem('token'),
   userInfo: {}
 }

 const mutations = {
  //  获取验证码
  GETCODE(state, code) {
    state.code = code
  },
  // 用户登陆
  USERLOGIN(state,token) {
    state.token = token
  },
  // 获取用户数据
  GETUSERINFO(state,userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state) {
    state.token = "",
    state.userInfo = {},
    localStorage.removeItem('token')
  }
 }

 const actions = {
  //  获取验证码 正常情况后端会直接返回给用户的手机
  async getCode({commit},phone) {
     const res = await reqGetCode(phone)
     if(res.code == 200) {
       commit('GETCODE', res.data)
       return 'ok'
     }else {
       return Promise.reject(new Error('fail'))
     }
   },
  //  用户注册
  async userRegister({commit}, user) {
    const res = await reqUserRegister(user)
    if(res.code == 200) {
      return 'ok'
    }else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户登陆
  async userLogin({commit}, data) {
    const res = await reqUserLogin(data)
    // console.log(res)
    if(res.code == 200) {
      // 获取token 用户的唯一标识
      commit('USERLOGIN', res.data.token)
      localStorage.setItem('token', res.data.token)
    }else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户信息
  async getUserInfo({commit}) {
    const res = await reqUserInfo()
    if(res.code == 200) {
      commit("GETUSERINFO", res.data)      
    }
    console.log(res)
  },
  // 退出登录
  async userLogout({commit}) {
    const res = await reqUserLogout()
    if(res.code == 200) {
      commit("CLEAR")
    }
  }
 }

 const getters = {}

 export default {
   state,
   getters,
   mutations,
   actions
 }
// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

import store from '@/store'

const requests = axios.create({
  // 配置对象
  // 基础路径,发请求的时候,路径中会出现api
  baseURL: "/api",
  // 代表请求超时时间5s
  timeout: 5000
})

// 请求拦截器: 在发送请求前,请求拦截器可以检测到,可以在请求发起之前做一些事情
requests.interceptors.request.use(config => {
  // 进度条开始
  nprogress.start()
  // 请求头添加一个字段 与后台商量好的
  if(store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 用户token 身份标识
  if(store.state.user.token) {
    config.headers.token = store.state.user.token
  }  
  // config: 配置对象, 对象里有一个属性很重要, header请求头
  return config 
})

// 响应拦截器
requests.interceptors.response.use(res => {
  // 进度条结束
  nprogress.done()
  // 成功的回调函数, 服务器相应数据回来以后, 响应拦截器可以检测到, 做一些事情
  return res.data
}, err => {
  // 响应失败的回调函数
  return Promise.reject(new Error('false'))
})

// 对外暴露
export default requests
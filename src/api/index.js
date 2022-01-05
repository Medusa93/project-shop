// 当前这个模块: API进行统一管理
import requests from './ajax'
import mockRequests from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList
// 发请求: axios发请求返回的结果是Promise对象
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})

// 获取banner (Home页轮播图列表数据)
export const reqGetBannerList = () => mockRequests({url: '/banner', method: 'GET'})

// 获取floor组件数据
export const reqGetFloorList = () => mockRequests({url: '/floor', method: 'get'})
// 搜索功能 params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:'/list', method: 'post', data: params})
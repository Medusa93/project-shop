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

// 获取商品详情信息
export const reqGoodsInfo = (skuid) => requests({url:`/item/${skuid}`, method: 'get'})

// 将产品添加到购物车中 (获取更新某一个产品的个数)
// /cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})

// 获取购物车数据
export const reqShopCartList = () => requests({url: '/cart/cartList', method: 'get'})

// 删除购物车某一个产品
export const deleteCart = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})

// 修改某个商品勾选状态
export const updateChecked = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})

// 获取验证码
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'})

// 用户注册
export const reqUserRegister = (data) => requests({url: "/user/passport/register", data, method: "post" })

// 用户登陆
export const reqUserLogin = (data) => requests({url: "/user/passport/login", data, method: "post"})

// 获取用户信息
export const reqUserInfo = () => requests({url: "/user/passport/auth/getUserInfo", method: "get"})

// 退出登录
export const reqUserLogout = () => requests({url: "/user/passport/logout", method: "get"})

// 获取用户地址信息
export const reqAddressInfo = () => requests({url: "/user/userAddress/auth/findUserAddressList", method: "get"})

// 获取订单交易页信息
export const reqOrderInfo = () => requests({url: "/order/auth/trade", method: "get"})

// 提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post"})

// 获取订单支付信息
export const reqPayment = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`, method: "get"})

// 查询支付订单状态
export const reqPayStatus = (orderId) => requests({url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get"})
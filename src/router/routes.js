// 路由配置信息
export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Login'),
    meta: {show: true, isAuth: false}
  },
  {
    name: 'register',
    path: '/register',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Register'),
    meta: {show: true, isAuth: false}
  },
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Home'),
    meta: {show: true, isAuth: false}
  },
  {
    name: 'search',
    path: '/search/:keyword?', // ?代表params参数可传可不传
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Search'),
    meta: {show: true, isAuth: false}
  },
  {
    name: 'detail',
    path: '/detail/:skuid',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Detail'),
    meta: {show: true, isAuth: false}
  },
  {
    name: 'addCartSuccess',
    path: '/addCartSuccess',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/AddCartSuccess'),
    meta: {show: true, isAuth: false}
  },
  {
    name: 'shopcart',
    path: '/shopcart',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/ShopCart'),
    meta: {show: true, isAuth: false}
  },
  {
    name: 'trade',
    path: '/trade',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Trade'),
    meta: {show: true, isAuth: true},
    // 路由独享守卫
    beforeEnter(to,from,next) {
      // 去交易页 必须是从购物车页面来
      if(from.path == '/shopcart') {
        next()
      }else {
        // 其他的路由组件而来 停留在当前路由
        next(false)
      }
    }
  },
  {
    name: 'pay',
    path: '/pay',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Pay'),
    meta: {show: true, isAuth: true},
    beforeEnter(to,from,next) {
      if(from.path == '/trade') {
        next()
      }else {
        next(false)
      }
    }
  },
  {
    name: 'paySuccess',
    path: '/paySuccess',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/PaySuccess'),
    meta: {show: true, isAuth: true}
  },
  {
    name: 'center',
    path: '/center',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Center'),
    meta: {show: true, isAuth: true},
    // 二级路由组件
    children: [
      {
        name: 'myOrder',
        path: 'myOrder',
        component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Center/MyOrder'),
        meta: {show: true, isAuth: true},
      },
      {
        name: 'groupOrder',
        path: 'groupOrder',
        component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Center/GroupOrder'),
        meta: {show: true, isAuth: true},
      }, 
      {
        path: '/center',
        redirect: '/center/myOrder'
      },     
    ]
  },
]
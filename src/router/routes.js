// 路由配置信息
export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Home'),
    meta: {show: true}
  },
  {
    name: 'search',
    path: '/search/:keyword?', // ?代表params参数可传可不传
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Search'),
    meta: {show: true}
  },
  {
    name: 'register',
    path: '/register',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Register'),
    meta: {show: false}
  },
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Login'),
    meta: {show: false}
  },
  {
    name: 'detail',
    path: '/detail/:skuid',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/Detail'),
    meta: {show: true}
  },
  {
    name: 'addCartSuccess',
    path: '/addCartSuccess',
    component: () => import(/* webpackChunkName: 'pages' */ '@/pages/AddCartSuccess'),
    meta: {show: true}
  },
]
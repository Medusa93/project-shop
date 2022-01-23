// 自定义插件
let myPlugins = {}
myPlugins.install = function(Vue,options){
  console.log(new Vue(),options)
}

export default myPlugins
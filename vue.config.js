module.exports = {
  // 关闭eslint
  lintOnSave: false,
  // 项目打包后,代码都是经过压缩加密的,如果运行报错,输出的信息无法准确知道是哪行代码报错
  // 有了map就可以像未加密代码一样,准确的输出是哪一行代码有错
  // 打包不带map文件,体积太大
  productionSourceMap: false, 
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
      },
    }
  }
}
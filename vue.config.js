'use strict'
const port = process.env.port || process.env.npm_config_port || 45579

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  // 热部署，配置同webpack-dev-server
  devServer: {
    // 端口号
    port: port,
    // 开发自动打开
    open: true,
    // 没的说
    openPage: '',
    // 当出现编译器错误或警告时
    // 在浏览器中显示全屏覆盖层
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // 这些玩意使用CDN
    externals: {
      'vue': 'Vue',
      'element-ui': 'ELEMENT'
    }
  }
}

'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8888 // dev port

module.exports = {
  // 没有具体地址，使用'/'能正确处理嵌套路由问题
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
    },
    // 开发代理
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:6789',
    //     // pathRewrite: {'^/api': ''},
    //     // target是域名的话，需要这个参数
    //     changeOrigin: true,
    //     // 设置支持https协议的代理
    //     secure: false
    //   }
    // },
    before: require('./mock/server')
  },
  configureWebpack: {
    // 这些玩意使用CDN
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'nprogress': 'NProgress',
      'animate ': 'animate.css',
      'element-ui': 'ELEMENT'
    },
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}

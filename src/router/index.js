import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const createRoute = () => new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '主页-微标知识分享平台',
      component: () => import('@/views/home')
    },
    {
      path: '/about',
      name: '介绍-微标知识分享平台',
      component: () => import('@/views/about')
    }
  ]
})

const router = createRoute()

// 预处理，添加加载状态
router.beforeEach((to, from, next) => {
  NProgress.start()

  // 改变标题
  document.title = to.name

  // 这玩意很重要
  next()
})

// 设置加载（不应该在此设置，应在子组件加载数据完成后调用）
// 将NProgress使用cdn方式
router.afterEach(() => {
  NProgress.done()
})

export default router

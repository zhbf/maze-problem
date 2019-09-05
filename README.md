# vue-cli-stage

使用vue-cli@3的脚手架，本脚手架使用路由使用history模式，单页面应用

## 目前扩展
1. [element-ui](https://element.eleme.cn/#/zh-CN/component/installation)，组件库，后续会添加其他UI库;
2. [animate.css](https://daneden.github.io/animate.css/)，CSS动画;
3. [axios](https://www.kancloud.cn/yunye/axios/234845)，它的本质还是XMLHttpRequests，和fetch不同;
4. [dayjs](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/README.zh-CN.md),处理时间和日期的JavaScript库;
5. [highlight.js](https://highlightjs.org/)，代码高亮JavaScript库;
6. [mavon-editor](https://github.com/hinesboy/mavonEditor)，一款在线的Markdown编辑器，编辑文本同时，熟悉markdown语法;
7. [mockjs](http://mockjs.com/)，拦截 Ajax 请求，生成随机数据;
8. [nprogress](https://ricostacruz.com/nprogress/)，加载状态;
9. [sass](http://sass.bootcss.com/)，CSS扩展语言

## 编辑器使用方式
### Webstorm
打开项目，在Terminal中执行
```shell
npm install
```

点击package.json中script左侧的三角形启动按钮即可使用，也可在Terminal中运行
```shell
npm run start
```
cmd中效果相同

1. 安装完成后，依次打开file\Settings\Languages & Frameworks\JavaSrcipt\Webpack，将webpack configuration file指向vue-cli-stage\node_modules\@vue\cli-service\webpack.config.js，这样做的目的是让编辑器认识下面这种路径写法
```js
import AppHeader from '@/components/header'
```

2. 再打开file\Settings\Editor\Code Style\HTML，将Tab Size及下面两个设置都设置为2
3. 再打开file\Settings\Editor\Code Style\JavaScript，同上面设置，完事后切换到Punctuation，将use替换为Don't use
```js
// 解释一下2/3设置，在webstorm中，Ctrl+Alt+L格式化代码
// 上述设置将编辑器环境设置为该项目lint设置
// 如果使用到例如TypeScript，也可相同设置
```
4. 打开file\Settings\Editor\File and Code Templates\，我的设置模板如下：

HTML File
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
<div id=""></div>
</body>
</html>
```

Vue Simple File Component
```html
<template>
    <div>
    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time: ''
            }
        },
        mounted() {
            console.log(new Date());
        }
    }
</script>

<style lang="scss" scoped>

</style>
```

### VS Code
还没用过😭

### 待更😁

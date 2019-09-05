<template>
  <div class="about">
    <h1>关于页</h1>
    <hr>
    <p>element-ui组件库可使用cdn，也可按需引入，element-ui存在icon，打包后子组件大小仍然上百kb</p>
    <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
    <el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
    <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
    <el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception"></el-progress>
  </div>
</template>

<script>
  export default {
    name: 'About'
  }
</script>

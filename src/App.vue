<template>
  <div id="app">
    <app-header/>
    <app-main/>
    <app-footer/>
  </div>
</template>

<script>
  import AppHeader from '@/components/header'
  import AppMain from '@/components/main'
  import AppFooter from '@/components/footer'

  export default {
    components: {
      AppHeader,
      AppMain,
      AppFooter
    }
  }
</script>

<template>
  <div class="home">
    <ul v-for="(item,index) of list"
        :key="index">
      <li v-for="(iKey,iIndex) of item"
          :key="iIndex">
        {{iKey}}
      </li>
      <li>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'home',
    data() {
      return {
        list: []
      }
    },
    mounted() {
      axios.get('/api/index')
        .then(res => {
          this.list = res.data.data.list

          console.log(this.list)
        })
    },
    components: {}
  }
</script>

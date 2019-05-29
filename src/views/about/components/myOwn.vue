<template>
  <div class="wrap">
    <h3>my infomation</h3>
    <p>status: {{status}}</p>
    <p>gitUrl: {{git_url}}</p>
  </div>
</template>

<script>
import { getTestData } from '@/http/moduleA.js'

export default {
  name: 'myOwn',
  data () {
    return {
      status: '',
      git_url: ''
    }
  },
  mounted () {
    getTestData().then(res => {
      if (res.status === 200) {
        this.git_url = res.data.git_url
        this.status = 'success'
      }
    })
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    padding: 10px;
  }
</style>

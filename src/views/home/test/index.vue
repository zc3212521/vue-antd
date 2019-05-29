<template>
  <h-menu>
    <router-view />
  </h-menu>
</template>

<script>
import HMenu from '@/components/HMenu'
export default {
  name: 'test',
  components: {
    HMenu
  }
}
</script>

<style lang="less" scoped>
  .page-wrap{
    padding: 24px;
    background-color: #fff;
  }
</style>

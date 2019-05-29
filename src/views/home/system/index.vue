<template>
  <h-menu>
    <router-view />
  </h-menu>
</template>

<script>
import HMenu from '@/components/HMenu'
export default {
  name: 'system',
  components: {
    HMenu
  }
}
</script>

<style lang="less" scoped>

</style>

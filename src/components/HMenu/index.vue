<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <side-menu />
    </a-layout-sider>
    <a-layout>
      <a-layout-content>
        <div class="view-history">
          <router-stack :list="list" />
        </div>
        <div class="layout-content">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        HG ©2019
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import SideMenu from '@/components/sideMenu'
import routerStack from '@/components/routerStack'
import { deepClone } from '@/utils'
export default {
  name: 'HMenu',
  components: {
    SideMenu,
    routerStack
  },
  created () {
    this.list = this.resolveList(this.$store.state.routerStack)
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    routerStack () {
      return this.$store.state.routerStack
    }
  },
  watch: {
    routerStack: function (newV, oldV) {
      this.list = this.resolveList(newV)
    }
  },
  methods: {
    resolveList (originData) {
      let list = deepClone(originData)
      list.forEach(item => {
        item.close = true
      })
      list.unshift({
        name: 'layout',
        title: '首页',
        params: {},
        close: false
      })
      return list
    }
  }
}
</script>

<style lang="less">
  .layout-content {
    margin: 20px 24px;
  }
  .view-history {
    margin-top: 5px;
  }
</style>

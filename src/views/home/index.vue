<template>
  <div class="home-wrap">
    <a-layout id="components-layout-demo-top-side">
      <a-layout-header class="header" style="padding: 0">
        <div class="logo">
          <div @click="goHome">HBM</div>
        </div>
        <a-menu
          mode="horizontal"
          :selectedKeys="[currentRouteUrl]"
          :style="{ lineHeight: '64px', display: 'inline-block' }"
        >
          <a-menu-item
            v-for="item in routeData"
            :key="item.name">
            <router-link :to="{ name: item.name }">{{ item.meta.title }}</router-link>
          </a-menu-item>
        </a-menu>
        <div class="global-header-right">
          <search-header class="header-search" />
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>文档说明</span>
            </template>
            <span>
              <a-icon type="question-circle" />
            </span>
          </a-tooltip>
          <h-avatar />
        </div>
      </a-layout-header>
      <router-view />
    </a-layout>
  </div>
</template>

<script>
import getUserRouter from '@/router/getRoutes'
import searchHeader from '@/components/searchHeader'
import HAvatar from '@/components/HAvatar'
export default {
  name: 'home',
  components: {
    searchHeader,
    HAvatar
  },
  data () {
    return {
      routeData: []
    }
  },
  mounted () {
    getUserRouter().then(router => {
      this.routeData = router[0].children
    })
  },
  computed: {
    currentRouteUrl: function () {
      return this.$route.path.split('/')[1]
    }
  },
  methods: {
    goHome () {
      this.$router.push({
        name: 'layout'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .home-wrap .ant-layout {
    min-height: 100%;
  }
  .home-wrap {
    height: 100%;
    overflow-y: scroll;
    .header {
      background-color: #fff;
      .header-search {
        padding: 0 12px;
        height: 64px;
        line-height: 64px;
        vertical-align: middle;
        overflow: hidden;
      }
    }
  }
  #components-layout-demo-top-side .logo {
    width: 200px;
    height: 64px;
    padding: 16px 0;
    float: left;
    overflow: hidden;
    margin-right: 16px;
    background-color: #1890ff;
  }
  #components-layout-demo-top-side .logo div {
    width: 152px;
    margin-left: 24px;
    line-height: 31px;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    color: #fff;
    background-color: rgba(217, 217, 217, 0.2);
    cursor: pointer;
  }
  .global-header-right {
    float: right;
    height: 100%;
    overflow: hidden;
    margin: 0 24px;

    & > span {
      display: inline-block;
      padding: 0 12px;
      cursor: pointer;
      height: 64px;
      line-height: 64px;
      vertical-align: middle;
      overflow: hidden;
      font-size: 16px;
    }
  }
</style>

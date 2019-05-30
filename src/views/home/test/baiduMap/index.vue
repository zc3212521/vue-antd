<template>
  <div class="map-wrap">
    <trace-map
      :height="mapHeight"
      :center="center"
      :pots="pots"
      :imgUrl="imgUrl"
      :speed="speed"
      :startTime="startTime"
      :endTime="endTime"
    />
  </div>
</template>

<script>
import TraceMap from './traceMap'
export default {
  name: 'baiduMap',
  data () {
    return {
      mapHeight: 500,
      pots: [
        [116.350658, 39.938285],
        [116.386446, 39.939281],
        [116.389034, 39.913828],
        [116.442501, 39.914603]
      ],
      center: [116.404, 39.915],
      zoom: 14,
      speed: 30,
      imgUrl: 'http://lbsyun.baidu.com/jsdemo/img/Mario.png',
      startTime: 1559204261000,
      endTime: 1559204371000
    }
  },
  components: {
    TraceMap
  }
}
</script>

<style lang="less" scoped>
.map-wrap {
  background-color: #fff;
  padding: 20px 24px;
  position: relative;
}
</style>

<template>
  <div class="trace-map-wrap">
    <div :style="{height: height + 'px'}"  id="map">
    </div>
    <div class="bar">
      <div style="margin-right: 30px;">
        <a-icon :type="play ? 'pause-circle' : 'play-circle'" style="font-size: 24px;" @click="goRun"/>
      </div>
      <a-slider
        :min="Math.round(startTime / 1000)"
        :max="Math.round(endTime / 1000)"
        @change="stepTo"
        class="process-bar"
        :value="currentValue"
        :marks="marks"
        :tipFormatter="formatter"
        style="width: 80%; display: inline-block;margin-right: 30px;"
      />
      <a-popover
        trigger="click"
        v-model="visible"
      >
        <div slot="content">
          <a-tag @click="changeSpeed(500)" color="#2db7f5">低速</a-tag>
          <a-tag @click="changeSpeed(100)" color="#87d068">普通</a-tag>
          <a-tag @click="changeSpeed(30)" color="#f50">高速</a-tag>
        </div>
        <a-button type="primary">倍速</a-button>
      </a-popover>
    </div>
  </div>
</template>

<script>
import BMap from 'BMap'
import sympolArrow from 'BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW'
import moment from 'moment'
import {
  p2pLength,
  getTotalLength,
  getAbsolutePoint,
  pot2mapPot
} from '@/utils/baiduMap'

export default {
  name: 'traceMap',
  props: {
    height: {
      type: Number,
      default: 300
    },
    center: {
      type: Array,
      required: true
    },
    pots: {
      type: Array,
      required: true
    },
    imgUrl: {
      type: String,
      default: 'http://lbsyun.baidu.com/jsdemo/img/Mario.png'
    },
    zoom: {
      type: Number,
      default: 13
    },
    startTime: {
      type: Number,
      required: true
    },
    endTime: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      map: null,
      detailPots: [],
      positionMk: null,
      marks: {
        [Math.round(this.startTime / 1000)]: moment(this.startTime).format('H:mm:ss'),
        [Math.round(this.endTime / 1000)]: moment(this.endTime).format('H:mm:ss')
      },
      currentIndex: 0,
      timer: null,
      currentValue: Math.round(this.startTime / 1000),
      play: false,
      visible: false,
      speed: 100,
      speedLevel: [
        {
          label: '低速',
          speed: 500
        },
        {
          label: '普通',
          speed: 100
        },
        {
          label: '高速',
          speed: 30
        }
      ]
    }
  },
  mounted () {
    let duringTime = Math.floor((this.endTime - this.startTime) / 1000)
    let totalLength = getTotalLength(this.pots)
    let ceilLength = totalLength / duringTime
    let abPots = [this.pots[0]]
    for (let i = 0; i < this.pots.length - 1; i++) {
      let currentPiece = p2pLength(this.pots[i], this.pots[i + 1])
      if (currentPiece > ceilLength) {
        let n = Math.floor(currentPiece / ceilLength)
        for (let m = 0; m <= n - 1; m++) {
          let currentAbsolutPoint = getAbsolutePoint(this.pots[i], this.pots[i + 1], (m + 1) * ceilLength)
          if (currentAbsolutPoint.length) {
            abPots.push(currentAbsolutPoint)
          }
          if (m === n - 1 && i === this.pots.length - 2) {
            abPots.push(this.pots[i + 1])
          }
        }
      }
    }
    this.detailPots = abPots
    this.createMap()
  },
  methods: {
    createMap () {
      this.map = new BMap.Map('map')
      this.map.centerAndZoom(pot2mapPot([this.center])[0], this.zoom)
      this.map.enableScrollWheelZoom(true)
      var sy = new BMap.Symbol(sympolArrow, {
        scale: 0.6, // 图标缩放大小
        strokeColor: '#fff', // 设置矢量图标的线填充颜色
        strokeWeight: '2' // 设置线宽
      })
      var line = new BMap.IconSequence(sy, '10', '30')
      var polyline = new BMap.Polyline(pot2mapPot(this.pots), {
        enableEditing: false, // 是否启用线编辑，默认为false
        enableClicking: true, // 是否响应点击事件，默认为true
        icons: [line],
        strokeWeight: '8', // 折线的宽度，以像素为单位
        strokeOpacity: 0.8, // 折线的透明度，取值范围0 - 1
        strokeColor: '#18a45b' // 折线颜色
      })

      this.map.addOverlay(polyline)

      var myIcon = new BMap.Icon(this.imgUrl, new BMap.Size(32, 70), {
        imageOffset: new BMap.Size(0, 0)
      })
      this.positionMk = new BMap.Marker(pot2mapPot(this.detailPots)[0], { icon: myIcon })
      this.map.addOverlay(this.positionMk)
      this.run(0)
    },
    run (i = 0) {
      this.positionMk.setPosition(pot2mapPot(this.detailPots)[i])
      if (i < this.detailPots.length) {
        this.timer = setTimeout(() => {
          i++
          this.currentValue = this.currentValue + 1
          this.currentIndex = i
          this.run(i)
        }, this.speed)
      }
    },
    setPostion (i) {
      clearTimeout(this.timer)
      this.positionMk.setPosition(pot2mapPot(this.detailPots)[i])
    },
    stepTo (i) {
      this.currentIndex = i - Math.round(this.startTime / 1000)
      this.currentValue = i
      this.setPostion(i - Math.round(this.startTime / 1000))
    },
    goRun () {
      console.log(333, this.currentIndex, this.detailPots.length)
      this.play = !this.play
      this.$nextTick(function () {
        if (this.play) {
          if (this.currentIndex >= this.detailPots.length - 1) {
            this.run(0)
            return
          }
          this.run(this.currentIndex)
        } else {
          clearTimeout(this.timer)
        }
      })
    },
    formatter (value) {
      return moment(value * 1000).format('H:mm:ss')
    },
    changeSpeed (speed) {
      console.log(22, speed)
      this.speed = speed
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .bar {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    div {
      display: inline-block;
      vertical-align: top;
    }
  }
</style>

<template>
  <div class="wrapper" ref="mains">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'; //只有低版本 ^1.13.2 才稳定

export default {
  name: 'Scroll',
  props: {
    probeCode: {
      type: Number,
      default: 0
    }
  },
  data () { 
    return {
      scrollw: null
    }
  },
  methods: {
    scrollHandle (x,y, seconds=300) {
      this.scrollw.scrollTo(x, y, seconds)
    },
    
    // scroll再次加载 finishPullUp(),在这里是封装起来，home页面去调用
    finishPullUp () {
      this.scrollw.finishPullUp()
    }

  },
  /**
   * 以下是生命周期
   */
  mounted () {
    // this.$nextTick(() => {
      // 以下定义的bscroll属性决定要开启的对应功能
      this.scrollw = new BScroll(this.$refs.mains, {
          click: true,
          probeType: this.probeCode, //通过probeCode外面传来数字 1或 2或 3（代表开启监听滚动）
          pullUpLoad: true
      }),
      // bscroll 得到滚动的坐标（y）值
      this.scrollw.on('scroll', (position) => {
        this.$emit('coordsMonitor', position)
      }),
      // bscroll 触发下拉加载事件
      this.scrollw.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    // })
  }
}
</script>

<style lang="less" scoped>
</style>

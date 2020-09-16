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
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () { 
    return {
      scroll: null
    }
  },
  methods: {
    // 将 scrollHandle 封装起来，其它页使用时直接调用
    scrollHandle (x,y, seconds=300) {
      // 下面this.scroll是来判断是否为空，空就后面不会再执行下去
      this.scroll && this.scroll.scrollTo(x, y, seconds)
    },
    // 将 refresh 将封装起来 ，其它页使用时直接调用
    refresh () {
      // refresh() 是来解决，scroll滚动区域中的图片完全加载完成后，重新计算scroll区域中能滚动的高度，这样一来就可以解决scroll滚动图片的卡顿情况
      this.scroll && this.scroll.refresh()  // 下面this.scroll是来判断是否为空，空就后面不会再执行下去
    },
    // 这里是封装 scroll里头的 finishPullUp() ,home页面直接调用
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  /**
   * 以下是生命周期
   */
  mounted () {
      this.scroll = new BScroll(this.$refs.mains, {
          click: true,
          probeType: this.probeCode, //通过probeCode外面传来数字 1或 2或 3（代表开启监听滚动）
          pullUpLoad: this.pullUpLoad
      }),
      // 监听 bscroll滚动位置 得到的坐标（y）值
      this.scroll.on('scroll', (position) => {
        this.$emit('coordsMonitor', position)
      }),
      // 上拉加载更多，向外触发可监听的事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
  }
}
</script>

<style lang="less" scoped>
</style>

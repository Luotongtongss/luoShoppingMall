<template>
  <div class="recommend">
   <section class="recom">
     <a v-for="item in recommendData" :key="item.sort" :href="item.link">
       <van-image
        round
        lazy-load
        :src="item.image"
      />
      <span>{{ item.title }}</span>
     </a>
   </section>
  </div>
</template>

<script>
export default {
  name: 'vRecommend',
  // props: ['recommendData'], 可以用这种方式，也可用目前的校验类型方式来接收数据
  props: {
    recommendData: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      // recommendList: this.recommendData
    }
  }
}
</script>

<style lang="less" scoped>
  .recommend {
    border-bottom: 10px solid #eeeeee;
    .recom {
      display: flex;
      padding: 15px 0  33px 0;
      // background-color: yellowgreen;
      a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        .van-image {
          width: 80px;
          height: 80px;
        }
        span {
          margin-top: 10px;
          font-size: 14px;
        }
      }
    }
  }
</style>

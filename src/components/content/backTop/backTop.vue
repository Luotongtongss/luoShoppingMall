<template>
  <div class="backTop">
    <img src="~assets/img/common/top.png" class="butImg" alt="">    
  </div>
</template>

<script>
export default {
  name: 'backTop',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .backTop {
    .butImg {
      position: fixed;
      right: 4px;
      bottom: 49px;
      width: 52px;
      height: 52px;
    }
  }
</style>

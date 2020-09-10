<template>
  <div class="goodsListItem">
    <!-- <div class="imgBox">
      <img :src="goodsItem.show.img" alt="">
    </div>
    <div class="content">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div> -->
    <img :src="goodsItem.show.img" alt="">
    <div class="content">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .goodsListItem {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
    img {
      width: 100%;
      border-radius: 5px;
    }
    .content {
      font-size: 12px;
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      overflow: hidden;
      text-align: center;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 3px;
      }
      .price {
        color: yellowgreen;
        margin-right: 20px;
      }
      .collect {
        position: relative;
      }
      .collect::before {
        content: '';
        position: absolute;
        left: -12px;
        top: 3px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ff6699;
      }
    }
  }
</style>

<template>
  <div class="goodsList">
    <v-goods-list-item  v-for="(item, inx) in goodsData" :key="inx" :goodsItem="item"></v-goods-list-item>
  </div>
</template>

<script>
import vGoodsListItem from 'content/goods/goodsListItem'

export default {
  name: 'goodsList',
  components: {
    vGoodsListItem
  },
  props: {
    goodsData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
  .goodsList {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>

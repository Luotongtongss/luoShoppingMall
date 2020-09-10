<template>
  <div id="home">
    <nav-bar class="home-nav"></nav-bar>
    <scroll 
      class="mans" 
      ref="elScroll" 
      :probeCode="3" 
      @coordsMonitor="getCoordsHandle"
      @pullingUp="pullingUPHandle">
      <van-swipe class="my-swipe"  indicator-color="white">
        <van-swipe-item v-for="(item, inx) in bannerList" :key='inx'>
          <a href="#">
            <van-image lazy-load :src="item.image" />
          </a>
        </van-swipe-item>
      </van-swipe>
      <v-recommend :recommendData="recommendList"></v-recommend>
      <v-special></v-special>
      <v-tab-control 
        class="tabControl" 
        :tabControlData="['流行', '新款', '精选']"
        @tabCut="goodsCut"></v-tab-control>
      <v-goods-list :goodsData="goods[currentPro].list"></v-goods-list>
    </scroll>
    <v-back-top @click.native="backTopHandle" v-show="isShowBackTop"></v-back-top>
  </div>
</template>

<script>
import {getHomeMultidata, getHomeGoods} from 'network/home.js';

import NavBar from 'common/navbar/NavBar';
import Scroll from 'common/scroll/scrollPiece';
import vTabControl from 'content/tabControl/tabControl';
import vGoodsList from 'content/goods/goodsList';
import vBackTop from 'content/backTop/backTop';

import vRecommend from 'views/home/childHome/recommendViews';
import vSpecial from 'views/home/childHome/specialViews';


export default {
  name: 'Home',
  components: {
    NavBar,
    Scroll,
    vTabControl,
    vGoodsList,
    vBackTop,
    vRecommend,
    vSpecial
  },
  data () {
    return {
      bannerList: [],
      recommendList: [],
      goods: {
        'pop': {page: 0, list: []},
       'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentPro: 'pop',
      isShowBackTop: false
    }
  },
  methods: {
     /**
     * 数据请求方法
     */
    getHomeMultidata_A () {
      getHomeMultidata().then(res => {
        this.bannerList = res.data.banner.list;
        this.recommendList = res.data.recommend.list;
        // console.log(res)
      })
    },

    getHomeGoods_A (type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.elScroll.finishPullUp() // finishPullUp()方法是betterScroll第一次加载上拉加载完毕，第二次就要执行这个函数才会加载给多数据
      })
    },

    /**
     * 事件监听方法
     */
    goodsCut (inx) {
      switch (inx) {
        case 0:
          this.currentPro = 'pop';
          break;
        case 1:
          this.currentPro = 'new';
          break;
        case 2:
          this.currentPro = 'sell';
          break
      }
    },
    // 回顶事件
    backTopHandle () {
      this.$refs.elScroll.scrollHandle(0, 0)
    },
    // backtop坐标，决定显示隐藏
    getCoordsHandle (coodrVal) {
      this.isShowBackTop = Math.abs(coodrVal.y) > 1000 ? true : false
    },
    // 下拉加载更多
    pullingUPHandle () {
      this.getHomeGoods_A(this.currentPro);
      this.$refs.elScroll.scrollw.refresh() // refresh()方法是当页面加载数据重新计算滚动内容高度。(解决某时滚动出现卡顿不可滚的情况)
    }
  
  },
  
  // 生命周期
  created () {
    // 请求多个数据
    this.getHomeMultidata_A();
    
    // 请求商品数据
    this.getHomeGoods_A('pop');
    this.getHomeGoods_A('new');
    this.getHomeGoods_A('sell')

  },
}
</script>

<style lang="less" scoped>
  #home {
    padding-top: 44px;
    // padding-bottom: 48px;
    height: 100vh;
    position: relative;
    
    .home-nav {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 3;
      background-color: #ff6699;
      color: #fff;
    }
    .mans {
      position: absolute;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 49px;
      overflow: hidden;
      .my-swipe .van-swipe-item {
        width: 100%;
        height: 195px;
        a {
          display: inline-block;
          height: 100%;
        }
      }
    }
    .yewls {
      height: 300px;
      overflow: hidden;
    }
    
  }
</style>

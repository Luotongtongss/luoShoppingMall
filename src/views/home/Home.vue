<template>
  <div id="home">
    <nav-bar class="home-nav"></nav-bar>
    <v-tab-control 
        class="tabControl-ss" 
        ref="tabControlEl_a"
        v-show="isShowTabControl"
        :tabControlData="['流行', '新款', '精选']"
        @tabCut="goodsCut"></v-tab-control>
    <scroll 
      class="mans" 
      ref="elScroll" 
      :probeCode="3" 
      :pullUpLoad="true"
      @coordsMonitor="getCoordsHandle"
      @pullingUp="loadGoodsListPage"
      >
      <van-swipe class="my-swipe"  indicator-color="white">
        <van-swipe-item v-for="(item, inx) in bannerList" :key='inx'>
          <a href="#">
            <van-image lazy-load :src="item.image" @load="swipeImageLoad"/>
          </a>
        </van-swipe-item>
      </van-swipe>
      <v-recommend :recommendData="recommendList"></v-recommend>
      <v-special></v-special>
      <v-tab-control 
        class="tabControl" 
        ref="tabControlEl_b"
        :tabControlData="['流行', '新款', '精选']"
        @tabCut="goodsCut"></v-tab-control>
      <v-goods-list :goodsData="goods[currentPro].list"></v-goods-list>
    </scroll>
    <v-back-top @click.native="backTopHandle" v-show="isShowBackTop"></v-back-top>
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from 'network/home.js';
import { debounce } from '../../common/utils';

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
      isShowBackTop: false,
      tabControlOffset: 0,
      recordTbCtOffset_y: 0,
      isLoad: false,
      isShowTabControl: false
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
      };
      this.$refs.tabControlEl_a.curtB = inx;
      this.$refs.tabControlEl_b.curtB = inx
    },
    // 回顶事件
    backTopHandle () {
      this.$refs.elScroll.scrollHandle(0, 0)
    },
    // 监听滚动的坐标 
    getCoordsHandle (coodrVal) {
      // backtop坐标，决定显示隐藏
      this.isShowBackTop = Math.abs(coodrVal.y) > 1000 ? true : false
      // tabControl的offsetTop 与 滚动距离判断，来决定是否要吸顶
      this.isShowTabControl = Math.abs(coodrVal.y) > this.tabControlOffset 
    },
    // 监听上拉加载下一页
    loadGoodsListPage () {
      this.getHomeGoods_A(this.currentPro)
    },
    // 监听图片加载完成，去获取 tabControlEl 的 offsetTop 才是准确的顶部距离
    swipeImageLoad () {
      // 这里我们 isLoad定义状态true/false,通过判断不让它多次(产生多次是根据图片有几张来的)获取 tabControlEl的offsetTop
      if (!this.isLoad) {
        this.tabControlOffset = this.$refs.tabControlEl_b.$el.offsetTop;
        this.isLoad = true
      }

    }

    // 防抖debounce()/节流throttle() --有时间研究一下
    // 封装一个防抖函数，让 this.$refs.elScroll.refresh() 不频繁的调用（频繁调用影响性能）
    // 这里的防抖动 再utils.js 文件中封装起来了，
    // debounce (func, delay) {
    //   let timer = null;
    //   return function (...args) {
    //     if (timer) clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // }
  
  },
  
  // 生命周期
  mounted () {
    // 请求多个数据
    this.getHomeMultidata_A();
    
    // 请求商品数据
    this.getHomeGoods_A('pop');
    this.getHomeGoods_A('new');
    this.getHomeGoods_A('sell');
    
    // 下面 debounce()传入this.$refs.elScroll.refresh参数，debounce()它的回调函数赋给 refresh
    //  this.$bus.$on()里头就去调用 refresh() 回调函数
    // const refresh = this.debounce(this.$refs.elScroll.refresh, 200);

    // 这里的 debounce防抖动方法是在utils.js文件中封装起来的，现在已引入就地使用
    const refresh = debounce(this.$refs.elScroll.refresh, 200);

    // 接收 goodsListItem页面发出来的事件，是通过$bus中线事件中转这么一个东西来接受goodsListItem发出来的事件
    this.$bus.$on('itemImageLoadEvent', () => {
      // this.$refs.elScroll.refresh()
      refresh()
    })
  },
  // 组件使用了 keep-alive 缓存标签时, activated 生命周期函数 才会别触发， 它是进入时触发
  activated () {
    // 当第二次进入home组件时，this.recordTbCtOffset_y就已经记录第一滚动的高度了
    // 接着将它传入 scrollHandle() 方法里头，scrollHandle()是scrollTo() 的封装
    this.$refs.elScroll.scrollHandle(0, this.recordTbCtOffset_y, 0);
    this.$refs.elScroll.refresh() // 再次刷一下
  },
  // 组件使用了 keep-alive 缓存标签时, deactivated 生命周期函数 才会别触发, 它是离开时触发
  deactivated () {
    // 离开当前组件记录滚动的高度 , 赋值给 this.recordTbCtOffset_y
    this.recordTbCtOffset_y = this.$refs.elScroll.scroll.y
  }
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
    .tabControl-ss {
      position: relative;
      z-index: 3;
      background-color: #fff
    }
    
  }
</style>

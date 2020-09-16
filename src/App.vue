<template>
  <div id="app">
     <!-- keep-alive 标签是来缓存组件不被销毁 -->
     <!-- 使用 keep-alive 有两个 生命周期函数 activated()--进入时触发  deactivated()--离开时触发，注意：只有使用了 keep-alive 这两生命周期才可使用 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'content/mainTabbar/MainTabBar'
export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';

  #app {
    position: relative;
  }
</style>

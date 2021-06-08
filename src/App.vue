<template>
  <div id="app">
    <!-- keep-alive 页面离开 不会被销毁 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="MainTabBar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from './components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
@import "./assets/css/base.css";
  .MainTabBar{
    z-index: 100;
  }
</style>

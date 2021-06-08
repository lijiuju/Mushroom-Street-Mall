<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <child-list class="child-list"></child-list>
    <!-- 撑开内容 -->
    <div class="lzp"></div>
    <!-- 购物车 底部 导航 组件 -->
    <child-button-bar></child-button-bar>
  </div>
</template>

<script>
// 引入 导航栏 组件
import NavBar from '@/components/common/navbar/NavBar';
// 引入 商品列表 组件
import ChildList from './childComps/ChildList';
// 引入 购物车底部导航 组件
import ChildButtonBar from './childComps/ChildButtonBar';

  export default {
    name: "Cart",
    components: {
      NavBar,
      ChildList,
      ChildButtonBar
    },
    // 计算属性
    computed: {
      cartLength(){
        return this.$store.state.cartList.length
      }
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .child-list{
    margin-top: 49px;
  }

  .lzp{
    height: 99px;
  }
</style>

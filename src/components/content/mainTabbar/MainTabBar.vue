<template>
    <tab-bar>
      <!-- path activeColor 自定义名 父组件传递数据给子组件 -->
      <tab-bar-item path="/home" activeColor="red">
        <!-- 动态替换TabBarItem组件的slot 通过slot绑定name -->
        <img slot="item-icon" src="@/assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-o" src="@/assets/img/tabbar/home-o.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="red">
        <img slot="item-icon" src="@/assets/img/tabbar/category.png" alt="">
        <img slot="item-icon-o" src="@/assets/img/tabbar/category-o.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="red">
        <img slot="item-icon" src="@/assets/img/tabbar/cart.png" alt="">
        <img slot="item-icon-o" src="@/assets/img/tabbar/cart-o.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="red">
        <img slot="item-icon" src="@/assets/img/tabbar/my.png" alt="">
        <img slot="item-icon-o" src="@/assets/img/tabbar/my-o.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
// 引入TabBar 组件
import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBatItem'

export default {
    name:'MainTabBar',
    // 注册组件
    components: {
        TabBar,
        TabBarItem
    }
}
</script>

<style scoped>

</style>
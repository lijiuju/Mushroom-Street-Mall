<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <!-- 使用轮播图组件 -->
    <!-- :banners="banners" 动态传递数据给子组件 -->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 使用版位组件 -->
    <recommend-view :recommends="recommends"></recommend-view>
    <!-- 使用热门推荐 组件 -->
    <feature-view></feature-view>
    <!-- 使用滚动导航栏 组件 -->
    <tab-control class="tab-control" 
    :titles="['流行','新款','精选']"
    @tabClick="tabClick"> <!--接收子组件传递过来的自定义事件--> </tab-control>
    <!-- 使用 首页商品数据组件-->
    <goods-list :goods="goods[currentType].list"></goods-list>
    <!-- 使用回到顶部按钮组件 -->
    <back-top></back-top>

    <!-- 11111 顶成底部内容-->
    <div class="lzp"></div>
  </div>
</template>

<script>
// 导入导航栏顶部组件
import NavBar from '@/components/common/navbar/NavBar';
// 导入首页网络请求数据函数
import {getHomeMultiData,getHomeGoods} from '@/network/home';
// 导入首页轮播图组件
import HomeSwiper from './childComps/HomeSwiper';
// 导入首页版位组件
import RecommendView from './childComps/RecommendView';
// 导入热门推荐 组件
import FeatureView from './childComps/FeatureView';
// 导入首页滚动导航栏
import TabControl from '@/components/content/tabControl/TabControl';
// 导入首页商品数据组件
import GoodsList from '@/components/content/goods/GoodsList';
// 导入回到顶部按钮 组件
import BackTop from '@/components/content/backTop/BackTop';

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      BackTop
    },
    data () {
      return {
        // banners 网络请求轮播图的数据
        banners:[],
        // recommends 网络请求主页版位数据
        recommends:[],
        // 主页商品详情数据
        goods:{
          // page 页 list 数据
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop'
      }
    },
    // 生命周期函数 页面被创建就触发  created:在模板渲染成html前调用
    created () {
      // 1.请求多个数据
      this.getHomeMultiData();
      // 2. 请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      /**
       * 事件监听方法
       */
      // 接收子组件传递过来的自定义事件 并且接收传递过来的index值
      tabClick(index){
        // console.log(index);
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultiData(){
        // 1.请求多个数据
        getHomeMultiData().then(res => {
          // console.log(res);
          // banners 网络请求轮播图的数据
          this.banners = res.data.banner.list;
          // recommends 网络请求主页版位数据
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        // 2. 请求商品数据
        // this.goods[type].page  = 0
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          // console.log(res);
          // ...数组名：...是把数组解析成一个一个元素追加到新的数组中
          this.goods[type].list.push(...res.data.list)
          // 把请求到的第一页数据追加到变量中之后 重新给page加1
          this.goods[type].page += 1
        })
      },

      // 2. 实时监听 获取页面滚动高度
      scrollHandle(e){
        let top = e.srcElement.scrollingElement.scrollTop;    // 获取页面滚动高度
        // console.log(top);
        // 如果滚动的高度是4500-4600之间就加30条数据
        if(top > 4500 && top < 4600){
          // 调用getHomeGoods 方法 并且传递当前的currentType值
          this.getHomeGoods(this.currentType)
        }
      }

    },

    // mounted 在模板渲染成html后调用
    mounted () {
      // 1. 绑定页面滚动事件
      window.addEventListener('scroll',this.scrollHandle);
      // window.removeEventListener('scroll',this.scrollHandle);
    },

  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .tab-control{
    /* position: sticky; 粘贴属性 要配合top属性一起使用 */
    position: sticky;
    background-color: #fff;
    top: 44px;
    z-index: 99;
  }

  .lzp{
    height: 50px;
  }
</style>

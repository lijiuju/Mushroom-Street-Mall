<template>
  <div id="detail">
    <!-- 导航栏 --><!-- @titleClick="titleClick" 子组件传递过来的事件-->
    <detail-nav-bar class="detail-nav-bar d_jump" @titleClick="titleClick" ref="detailnav"></detail-nav-bar>
    <!-- 轮播图 -->
    <detail-swiper :topImages="topImages" class="detail-swiper" ></detail-swiper>
    <!-- 商品详情 -->
    <detail-base-info :goods="goods"></detail-base-info>
    <!-- 商品评论 -->
    <detail-comment-info :commentInfo="commentInfo" class="d_jump" ref="comment"></detail-comment-info>
    <!-- 商品店铺 -->
    <detail-shop-info :shop="shop"></detail-shop-info>
    <!-- 商品参数 -->
    <detail-param-info :paramInfo="paramInfo" class="d_jump" ref="params"></detail-param-info>
    <!-- 商品详情数据 -->
    <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
    <!-- 商品推荐 -->
    <goods-list :goods="recommends" class="d_jump" ref="recommends"></goods-list>
    <!-- 回到顶部 组件 -->
    <back-top></back-top>
    <!-- 底部导航栏 组件 -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- 加入购物车 提示框 -->
    <toast :message="message" :show="show"></toast>
    <!-- 撑开底部内容 -->
    <div class="lzp"></div>
  </div>
</template>

<script>
// 引入导航栏组件
import DetailNavBar from './childComps/DetailNavBar'
// 引入iid网络请求 函数
import {getDetail,getRecommend,Goods,Shop,GoodsParam} from '@/network/detail'
// 引入轮播图组件
import DetailSwiper from './childComps/DetailSwiper';
// 引入商品详情组件
import DetailBaseInfo from './childComps/DetailBaseInfo';
// 引入商品店铺组件
import DetailShopInfo from './childComps/DetailShopInfo';
// 引入商品详情数据 组件
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
// 引入商品参数 组件
import DetailParamInfo from './childComps/DetailParamInfo';
// 引入 商品评论 组件
import DetailCommentInfo from './childComps/detailCommentInfo';
// 引入 商品推荐 组件
import GoodsList from '@/components/content/goods/GoodsList';
// 引入动画函数
import {scrollAnimation} from '@/components/content/backTop/animation';
// 引入 点击回到顶部 组件
import BackTop from '@/components/content/backTop/BackTop';
// 引入 底部导航栏 组件
import DetailBottomBar from './childComps/DetailBottomBar';
// 引入 加入购物车提示框 组件
import Toast from '@/components/common/toast/Toast.vue'

export default {
  name:'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    BackTop,
    DetailBottomBar,
    Toast
  },
  data () {
    return {
      iid:null,
      topImages:[],// 顶部轮播图数据
      goods:{}, //商品详情
      shop:{}, // 商品店铺数据
      detailInfo:{}, // 商品详情数据
      paramInfo:{}, // 商品参数
      commentInfo: {}, // 商品评论
      recommends:[], // 商品推荐
      themeTopYs:[],
      currentIndex:null,
      message:'', // 加入购物车提示信息
      show:false, // 购物车提示信息显示与隐藏
    }
  },
  // created 页面创建
  created () {
    // this.$route.params 拿到传递过来的数据
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      // 3.请求顶部轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 4.获取商品信息
      // new Goods 是实例化一个函数对象
      // Goods括号里面的数据传递给daetail.js里面去
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goods);

      // 5. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // console.log(this.shop);

      // 6. 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 7. 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //8.取出评论的信息
      this.commentInfo = data.rate.list ? data.rate.list[0] : {}
      // console.log(this.commentInfo);

    })
    
    // 3. 请求推荐数据
    getRecommend().then(res =>{
      // console.log(res);
      this.recommends = res.data.list;
    })

    //  由于因为页面刚刚加载img图片可能还可以完成加载完，所以使用定时器来延迟一秒，等所有图片加载完
    setTimeout(() =>{
      // this.$refs.自定义名.$el.offsetTop 获取当前组件距离页面顶部的距离 需要在组件绑定一个 ref="自定义名"
      // 把获取的的组件的位置值保存到我们的变量中
        this.$nextTick(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
         this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      })
      },1000)
  },
  methods: {

    titleClick (index) {
      // // 锚点跳转 给需要跳转的组件加上一个class="d_jump" 然后通过我们传递过来的index值 点击之后对应index值一样的组件
      // let jump = document.querySelectorAll('.d_jump')
      // // 获取需要滚动的距离
      // let total = jump[index].offsetTop
      // // Chrome
      // document.body.scrollTop = total
      // // Firefox
      // document.documentElement.scrollTop = total
      // // Safari
      // window.pageYOffset = total

      if(index === 0){
        // 使用动画效果函数  
        // currentY当前位置 this.themeTopYs[0]目标位置 
      const currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollAnimation(currentY, this.themeTopYs[0])
      }else if(index === 1){
        const currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollAnimation(currentY, this.themeTopYs[1])
      }else if(index === 2){
        const currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollAnimation(currentY, this.themeTopYs[2])
      }else if(index === 3){
        const currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollAnimation(currentY, this.themeTopYs[3])
      }
      
      
    },

    // 2. 实时监听 获取页面滚动高度
    scrollHandle(e){
      // 1.实时监听 获取页面滚动高度
      let positionY = e.srcElement.scrollingElement.scrollTop;    // 获取页面滚动高度
      // console.log(top);
      // 2.positionY和主题中值进行对比
      // [0, 5430, 6107, 6458, Number.MAX_VALUE]
      // [0, 5430)  currentIndex = 0
      // [5430, 6107)  currentIndex = 1
      // [6107, 6458)  currentIndex = 2
      // [6458, Number.MAX_VALUE) currentIndex = 3
      // let length = this.themeTopYs.length
      // for(let i = 0; i < length-1; i++) {
      //   if (this.currentIndex !== i && (positionY >= this.themeTopYs[i]) && (positionY < this.themeTopYs[i+1])) {
      //     this.currentIndex = i
      //     // console.log(i);
      //     this.$refs.detailnav.currentIndex = this.currentIndex
      //   }
      // }

      if(positionY === this.themeTopYs[0]){
        this.currentIndex = 0,
        this.$refs.detailnav.currentIndex = this.currentIndex
      }

    },

    // 接收子组件传递过来的购物车事件
    addToCart(){
      // 1.获取购物车需要展示的信息
      const product = {}
      // 商品图片
      product.image = this.topImages[0];
      // 商品标题
      product.title = this.goods.title;
      // 商品描述信息
      product.desc = this.goods.desc;
      // 商品价格
      product.price = this.goods.realPrice;
      // 商品iid
      product.iid = this.iid;

      // 2. 将商品添加到购物车里
      // 通过$store.commit拿到vuex里面的mutations方法里面的属性
      // $store.commit('vuex里面的mutations方法里面的属性',传递的数据)
      // this.$store.commit('addCart',product)
      // this.$store.dispatch 拿到vuex里面的actions 方法里面的属性
      this.$store.dispatch('addCart',product).then(res => {
        // console.log(res);
        this.show = true; // 显示加入购物车信息
        this.message = res; // 加入购物车信息

        setTimeout(() => {
          this.show = false
          this.message = ''
        },1500)
      })
    }
    
  },
  // mounted 在模板渲染成html后调用
  mounted () {
    // 1. 绑定页面滚动事件
     window.addEventListener('scroll',this.scrollHandle);
  },
  // 离开销毁
  beforeDestroy () {
    window.removeEventListener('scroll',this.scrollHandle);
  }
}
</script>

<style scoped>
  .detail-nav-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .detail-swiper{
    margin-top: 44px;
  }

  #detail{
    position: relative;
    z-index: 9999;
    background-color: #fff;
  }

  .lzp{
    height: 50px;
  }
</style>
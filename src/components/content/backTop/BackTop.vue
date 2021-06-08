<template>
<!-- 用v-show动态来绑定显示或者隐藏 -->
  <div class="back-top" @click="backClick" v-show="isShow">
    <img src="@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
// 导入滚动 动画函数
import {scrollAnimation} from './animation'
export default {
  name:"BackTop",
  data () {
    return {
      isShow:false
    }
  },
  methods: {
    backClick(){
      // 使用动画效果函数
      const currentY = document.documentElement.scrollTop || document.body.scrollTop
      scrollAnimation(currentY, 0)
    },
    // 2. 实时监听 获取页面滚动高度
    scrollHandle(e){
      let top = e.srcElement.scrollingElement.scrollTop;    // 获取页面滚动高度
      // console.log(top);
      this.isShow = top > 600;
  }

  },
  // mounted 在模板渲染成html后调用
  mounted () {
    // 1. 绑定页面滚动事件
     window.addEventListener('scroll',this.scrollHandle);
  },

}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 10px;
    bottom: 50px;
  }

  .back-top img{
    width: 43px;
    height: 43px;

  }
</style>
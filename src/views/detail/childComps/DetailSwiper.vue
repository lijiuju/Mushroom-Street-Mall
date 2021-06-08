<template>
  <el-carousel height="300px">
    <el-carousel-item v-for="item in topImages" :key="item">
      <div><img :src="item" alt=""></div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {
  name:'DetaillSwiper',
  props: {
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data () {
    return {
      
    }
  },
}
</script>

<style scoped>
  .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    img{
     /*设置图片宽度和浏览器宽度一致*/
      width:100%;
      height:inherit;
    }
</style>
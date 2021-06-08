<template>
  <div class="recommend">
    <div class="recommendItem" v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    // 接收父组件的数据
    props:{
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom: 3px solid #eee;
  }

  .recommendItem{
    flex: 1;
  }

  .recommendItem img{
    width: 65px;
    height: 65px;
    margin-bottom: 5px;
  }
</style>

<template>
  <div class="goods">
    <!-- 把遍历的每个人对象item值传递给子组件 -->
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item">

    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:'GoodsList',
  components: {
    GoodsListItem
  },
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods{
    display: flex;
    /* flex-wrap: wrap; 宽度不够换行 */
    flex-wrap: wrap;
    /* space-evenly 将剩余空间平均分割 */
    justify-content: space-evenly;
  }
</style>
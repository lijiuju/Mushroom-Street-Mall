<template>
  <div class="cart-list">
    <child-list-item 
    v-for="(item,index) in $store.state.cartList" 
    :key="index" :itemInfo="item">

    </child-list-item>
  </div>
</template>

<script>
// 引入商品列表组件
import ChildListItem from './ChildListItem'

export default {
  name:'ChildList',
  components: {
    ChildListItem
  }
}
</script>

<style scoped>

</style>
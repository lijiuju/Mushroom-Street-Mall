<template>
  <div class="goodsItem" @click="itemClick">
    <img :src="showImage" alt="">
    <div class="goodsInfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props: {
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  // 计算属性
  computed: {
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    itemClick(){
      // this.goodsItem.iid跳转路由的时候传递商品id过去
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goodsItem{
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }
  .goodsItem img{
    width: 100%;
    border-radius: 5px;
  }

  .goodsInfo{
    overflow: hidden;
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
  }

  .goodsInfo p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goodsInfo .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goodsInfo .collect{
    position: relative;
  }

  .goodsInfo .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button 
          :is-checked="isSelectAll" 
          class="check-button"
          @click.native="checkClick"></check-button>
        <span>全选</span>
      </div>

      <div class="price">
        合计：{{totalPrice}}
      </div>

      <div class="calculate">
        去结算({{checkLength}})
      </div>
    </div>
</template>

<script>
// 引入 选中按钮组件
import CheckButton from '@/components/content/checkButton/CheckButton';

export default {
  name:"ChildButtonBar",
  components: {
    CheckButton
  },
  computed: {
    
    // 计算选中商品的价格
    totalPrice(){
      // filter 过滤
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },

    // 计算商品选中的数量
    checkLength(){
      return this.$store.state.cartList.filter(item => item.checked).length
    },

    // 计算商品是否全部选中
    isSelectAll(){
      if(this.$store.state.cartList.length === 0) return false
      return !(this.$store.state.cartList.filter(item => !item.checked).length)
    }
  },
  methods: {
    // 监听组件点击
    checkClick(){
      if(this.isSelectAll){ // 全部选中
        // 遍历商品 改成全部不选中 
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{ // 部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }

}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    line-height: 40px;
    font-size: 14px;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price{
    margin-left: 20px;
    flex: 1;
  }

  .calculate{
    width: 90px;
    background-color: var(--color-tint);
    color: #fff;
    text-align: center;
  }
</style>
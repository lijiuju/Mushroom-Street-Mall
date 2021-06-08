<template>
  <div>
    <nav-bar class="navBar">
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" 
        class="titleItem" :class="{active: index === currentIndex}"
        @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
// 导入导航栏组件
import NavBar from '@/components/common/navbar/NavBar'

export default {
  name:'Detail',
  components: {
    NavBar
  },
  data () {
    return {
      titles:['商品','评论','参数','推荐'],
      currentIndex:0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      // $emit 子组件传递数据给父组件
      this.$emit('titleClick',index)
    },
    backClick(){
      // back 返回上一层路由
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .back img{
    margin-top: 10px;
    height: 24px;
    width: 24px;
  }

  .title{
    display: flex;
    font-size: 14px;
  }

  .titleItem{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }

  .navBar{
    background-color: #fff;
    /* box-shadow: x y 阴影程度 颜色 */
    box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  }
</style>
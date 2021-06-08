<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- <img src="../../assets/img/tabbar/home.png" alt="">
        <div>首页</div> -->
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-o"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  // 1. props 接收父组件传递过来的数据
  props: {
    // 传递过来的path数据 字符串类型
    path:String,
    // 接收父组件传递过来的activeColor
    activeColor:{
      // type 类型
      type:String,
      // default 默认值
      default:'red'
    }
  },
  data () {
    return {
      // isActive:true
    }
  },
  // 计算属性函数
  computed: {
    isActive(){
      // indexof查找当前的路由path里面有没有this.path
      //  /home -> item1(/home) = true
      //  /home -> item1(/categry) = false
      //  /home -> item1(/cart) = false
      //  /home -> item1(/my) = false
      // indexof如果找到了就是不等于-1 没找到就是-1
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    // 2. 通过点击当前item 拿到当前父组件传递过来的path数据 实现页面跳转
    itemClick(){
      // () => {},err => err 双击报错，抛出异常
      this.$router.replace(this.path,() => {},err => err)
    }
  }
}
</script>

<style scoped>

  .tab-bar-item{
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
  }
  .tab-bar-item img{
      width: 24px;
      height:24px;
      margin-top: 3px;
      vertical-align: middle; /* 清除图片边距 */
  }

</style>

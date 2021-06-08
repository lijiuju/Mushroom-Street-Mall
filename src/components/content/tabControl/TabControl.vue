<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" 
    class="tab-control-item" 
    :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data () {
      return {
        currentIndex:0
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index;
        // 子组件传递数据给父组件
        // this.$emit('自定义事件名',传递的数据)
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 44px;
    line-height: 44px;
  }
  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>

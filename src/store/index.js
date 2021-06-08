import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装vuex插件
Vue.use(Vuex)

// 2. 创建Store对象
const store = new Vuex.Store({
  // state 保存状态
  state:{
    cartList:[]
  },
   // mutations 方法 方法函数里面的参数默认有一个 state
  //  mutations唯一的目的就是修改state中的状态
   mutations:{
    // 添加数量
    addCounter(state,payload){
      payload.count++
    },
    // 添加商品
    addToCart(state,payload){
      payload.checked = true
      state.cartList.push(payload)
    }
   },
  // actions 异步操作方法
  // 函数参数里面默认有个 context
  // 这里的context 指向的外面创建全局的store 对象
  actions:{
    addCart(context,payload){
      return new Promise((resolve) => {
        // 将我们接收到的payload数据追加到state的cartList数组里面
        // state.cartList.push(payload)
        // payload新添加的商品
        let oldProduct = null;

        // 1.查找之前的数组中是否有该商品
        for(let item of context.state.cartList){
          // 1.1 如果我们现在的当前商品id 和 刚刚添加进来的商品id一样
          if(item.iid === payload.iid){
            // 1.2 把当前商品赋值给我们创建的变量
            oldProduct = item;
          }
        }

        // 2. 判断oldProduct
        // 1.3 如果存在 那么就让count在原来的基础上加1
        if(oldProduct){
          // oldProduct.count += 1
          context.commit('addCounter',oldProduct)
          resolve('当前商品数量+1');
        }else{
        // 1.4 如果不存在 那么就让count的值为1
          payload.count = 1
          // 1.5 再把添加过来的商品数据存放在我们vuex里面
          // context.state.cartList.push(payload)
          context.commit('addToCart',payload)
          resolve('加入购物车成功');
        }
      })
    }
  }
})

// 3.导出
export default store;
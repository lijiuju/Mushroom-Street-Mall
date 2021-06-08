import {request} from "./request";

export function getHomeMultiData(){
  return request({
    url:'/home/multidata'
  })
}

// 请求主页商品详情的数据 
// type和page 请求方传递过来的
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    // params api查询拼接
    params:{
      type,
      page
    }
  })
}
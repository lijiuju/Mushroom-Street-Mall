import {request} from './request'

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:'recommend'
  })
}

// 通过class来管理我们的多数据
export class Goods {
  // itemInfo, columns, services 我们传递过来的数据
  // constructor 方法是类的构造函数，是一个默认方法，通过 new 命令创建对象实例时，自动调用该方法。
  constructor(itemInfo, columns, services) {
    // 对数据进行解析
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  //constructor 方法是类的构造函数，是一个默认方法，通过 new 命令创建对象实例时，自动调用该方法。
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}


export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0]: '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
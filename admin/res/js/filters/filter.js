'use strict';
var appFilters = angular.module('app.filters', [])
.filter('to_status',function(){
  return function(x){
    var a=['否','是']
    return a[x];
  };
})
.filter('first_img',function(){
  return function(x){
    return x.split(',')[0];
  }
})
.filter('money_to_str',function(){
  return function(x){
    
  }
})
.filter('to_rbac',function(){
  return function(x){
    var i=0,rbac=['','管理员','产品','销售代表','首页广告','评论','会员','订单','报表'],len,result=[];
    x=x.split(',');
    len=x.length;
    for(i;i<len;i++){
      result.push(rbac[x[i]]);
    }
    return result.join(',')
  }
})
.filter('to_sex',function(){
  return function(x){
    var arr=['未知','男','女'];
    return arr[x];
  }
})
.filter('to_order_status',function(){
  return function(x){
    var arr=["","待付款","已支付","待发货","已发货","已签收","已完成","已过期","已取消"];
    return arr[x];
  }
})
;



angular.module('filters', []).filter('headurl',function(){
  return function(x,y){
    var h='';
    if(x){
      h='<img src="'+CONFIG.IMG+x+'" />'
    }else{
      if(y){
        h='<span class="headurl">'+y.slice(0,1)+'</span>';
      }else{
        h='';
      }
    }
    return h;
  };
}).filter('sex',function(){
  return function(x){
    var a=['','男','女'];
    return a[x];
  };
}).filter('first_img',function(){
  return function(x){
    if(x){
      return x.split(',')[0];
    }
  }
}).filter('to_order_status',function(){
  return function(x){
    var arr=["","待付款","已支付","待发货","已发货","已签收","已完成","已过期","已取消"];
    return arr[x];
  }
});

var controllers = angular.module('controllers', []);

controllers.controller('index', function($scope, $rootScope, $http, $location,$route, car, myDialog) {
    $rootScope.app_title = "首页";
    loadShare({
      title:"薇姿汇 7B12",
      summary:"欢迎关注 空间微信账号！本账号提供大量外贸尾单衣帽箱包，欢迎光临订购。地址:杭州市益乐路39号蓝海时代国际大厦7B12",
      icon:DOMAIN+"app/res/app/image/logo2.png",
      url:DOMAIN
    });
    var car_content = car.get();
    $scope.car_count= car_content.length;
    $scope.__PUBLIC__ = CONFIG.IMG;
    var banner = localStorage.getItem('banner');
    banner = (banner) ? eval("(" + banner + ")") : [];
    $scope.banners = banner;
    $scope.count=banner.length*100;
    $scope.per=100/banner.length;
    scroll.i=0;
    scroll.n=banner.length;
    scroll.lock=false;
    $http.get(CONFIG.DATA + 'index/banner', {}).then(function(r) {
      var d = r.data;
      if (d.flag == 1 && d.result) {
        $scope.banners = d.result;
        $scope.count=banner.length*100;
        $scope.per=100/banner.length;
        scroll.n=banner.length;
        localStorage.setItem('banner', JSON.stringify(d.result));
      }
    });
    var products = localStorage.getItem('products');
    products = (products) ? eval("(" + products + ")") : [];
    $scope.products = products;
    $scope.loading = true;
    $http.get(CONFIG.DATA + 'index/home', {}).then(function(r) {
      $scope.loading = false;
      var d = r.data;
      if (d.flag == 1 && d.result) {
        $scope.products = d.result;
        localStorage.setItem('products', JSON.stringify(d.result));
      }
    });
  })
  .controller('detail', function($scope, $rootScope, $http, $location,$routeParams,$timeout, car, myDialog) {
    $rootScope.app_title = "产品详情";
    var car_content = car.get();
    $scope.car_count = car_content.length;
    var id = $routeParams.id;
    $scope.loading = true;
    var req={id:id};
    $scope.__PUBLIC__ = CONFIG.IMG;
    $http.get(CONFIG.DATA + 'index/detail', {params:req}).then(function(r) {
      $scope.loading = false;
      var d = r.data;
      if (d.flag == 1 && d.result) {
        $rootScope.app_title = d.result.title;
        $scope.d = d.result;
        var banners = d.result.imgs.split(',');
        loadShare({
          title:d.result.title,
          summary:d.result.summary,
          icon:CONFIG.IMG+banners[0],
          url:DOMAIN+'#!/detail/'+id
        });
        $scope.banners=banners;
        $scope.count=banners.length*100;
        $scope.per=100/banners.length;
        scroll.i=0;
        scroll.n=banners.length;
        scroll.lock=false;
        $scope.sku=d.sku;
        $scope.stock=d.stock;
      }
    });
    
    $scope.condition={};
    $scope.condition_txt={};
    $scope.set_options=function(x,y){
      angular.forEach($scope.sku[x].items,function(v,i){
        v.class=i==y?"cur":"";
        if(i==y){
          $scope.condition['sku_value_id_'+(x+1)]=v.id;
          $scope.condition_txt['sku_value_id_'+(x+1)]=v.name;
        }
      });
      getGoal();
    }
    // $scope.stock[i].sku_value_id_1
    function getGoal(){
      var ob=[],i,a=$scope.stock,len=a.length,s=[],key;
      for(i in $scope.condition){
        ob.push($scope.condition[i]);
      }
      ob=ob.join(',');
      i=0;
      for(i;i<len;i++){
        s=[];
        key=null;
        if(a[i]['sku_value_id_1']){s.push(a[i]['sku_value_id_1']);}
        if(a[i]['sku_value_id_2']){s.push(a[i]['sku_value_id_2']);}
        if(a[i]['sku_value_id_3']){s.push(a[i]['sku_value_id_3']);}
        if(a[i]['sku_value_id_4']){s.push(a[i]['sku_value_id_4']);}
        if(a[i]['sku_value_id_5']){s.push(a[i]['sku_value_id_5']);}
        if(a[i]['sku_value_id_6']){s.push(a[i]['sku_value_id_6']);}
        if(a[i]['sku_value_id_7']){s.push(a[i]['sku_value_id_7']);}
        if(s.join(',')==ob){
          key=i;
          break;
        }
      }
      if(!key&&key!=0){
        $scope.target=false;
      }else{
        $scope.target=a[i];
      }
    }
    $scope.comments=[];
    $scope.page=0;
    $scope.total=0;
    function load(){
      req.p=$scope.page;
      $scope.loading = true;
      $http.get(CONFIG.DATA + 'comment/index', {params:req}).then(function(r) {
        $scope.loading = false;
        var d = r.data;
        if (d.flag == 1 && d.result) {
          $scope.comments=d.result;
          $scope.total=d.total_page;
        }
      });
    }
    load();
    $scope.prev=function(){
      if($scope.page>0){
        $scope.page--;
        load();
      }
    }
    $scope.next=function(){
      if($scope.page<$scope.total-1){
        $scope.page++;
        load();
      }
    }
    $scope.open_comment=function(){
      $scope.commont_opend=true;
    }
    $scope.comment_submit=function(){
      myDialog.confirm($scope,'确认发布？',function(){
        var req={content:$scope.comment_content,pid:id};
        if(!req.content){
          return myDialog.alert($scope,'请输入评论内容');
        }
        $scope.loading=true;
        $http.get(CONFIG.DATA + 'comment/add', {params:req}).then(function(r) {
          $scope.loading = false;
          var d = r.data;
          myDialog.tip($scope,d.msg,$timeout);
          if (d.flag == 1) {
            $scope.page=0;
            load();
          }
        });
      });
    }


    $scope.addcar=function(){
      if(!$scope.target){
        return myDialog.tip($scope,'请选择相应参数',$timeout);
      }
      
      var i=0,len=car_content.length,has=false;
      for(i;i<len;i++){
        if(car_content[i].id==$scope.target.id){
          car_content[i].num++;
          if(car_content[i].num>$scope.target.count){
            car_content[i].num=$scope.target.count;
          }
          has=true;
          break;
        }
      }
      if(!has){
        var title=$scope.d.title,//产品名称
          desc=[];// 产品参数
        for(i in $scope.condition_txt){
          desc.push( $scope.condition_txt[i]);
        }
        var tmp={
          id:$scope.target.id,//库存ID
          pid:id,//产品ID
          title:title,//产品标题
          desc:desc.join('-'),//产品参数
          num:1,
          price:$scope.target.price,//价格
          count:$scope.target.count,//库存
          image:($scope.d.imgs).split(',')[0]
        };
        car_content.push(tmp);
      }
      car.set(car_content);
      $scope.car_count = car_content.length;
      myDialog.tip($scope,'添加成功',$timeout,function(){
        $location.path('car');
      });
    }
  })
  .controller('car', function($scope, $rootScope, $http, $location,$routeParams,$timeout, car, myDialog,citys) {
    $rootScope.app_title = "购物车";
    var car_content = car.get();
    loadShare({
      title:"7B12",
      summary:"7B12",
      icon:DOMAIN+"app/res/app/image/logo.png",
      url:DOMAIN
    });
    $scope.car_count = car_content.length;
    $scope.__PUBLIC__ = CONFIG.IMG;
    $scope.items=car_content;
    $scope.inst=function(x){
      var d=car_content,i=0,len=d.length,k;
      for(i;i<len;i++){
        if(d[i].id==x){
          k=i;
          break;
        }
      }
      if(d[k].num>1){
        d[k].num--;
      }
      calc();
    }
    $scope.plus=function(x){
      var d=car_content,i=0,len=d.length,k;
      for(i;i<len;i++){
        if(d[i].id==x){
          k=i;
          break;
        }
      }
      d[k].num++;
      if(d[k].num>d[k].count){
        d[k].num=d[k].count;
        myDialog.tip($scope,'该商品仅剩 '+d[k].count+' 件',$timeout);
      }
      calc();
    }
    $scope.remove=function(x){
      var d=car_content,i=0,len=d.length,k;
      for(i;i<len;i++){
        if(d[i].id==x){
          k=i;
          break;
        }
      }
      d.splice(k,1);
      calc();
    }
    $scope.need_kd_price=false;
    function calc(){
      var car_content=$scope.items;
      car.set(car_content);
      $scope.car_count = car_content.length;
      var i=0,len=car_content.length,sum=0,total=0;
      for(i;i<len;i++){
        total+=parseInt(car_content[i].num);
        sum+=car_content[i].price*car_content[i].num;
      }
      $scope.price=sum;
      $scope.total=total;
      if($scope.price<200){
        $scope.need_kd_price=true;
        $scope.price=sum+10;
      }else{
        $scope.need_kd_price=false;
      }
    }
    calc();
    $scope.edit=[];
    $scope.addNewAddress=function(){
      $scope.editAddressTitle='添加新地址';
      $scope.openAddressEdit=true;
      $scope.edit=[];
      $scope.isAdd=true;
    }
    $scope.editAddress=function(i){
      $scope.editAddressTitle='修改地址';
      $scope.openAddressEdit=true;
      $scope.key=i;
      $scope.edit=$scope.myAddress[i].split(',');
      $scope.isAdd=false;
      $scope.changeProvince();
    }
    $scope.provinces=citys.provinces;
    $scope.changeProvince=function(){
      $scope.citys=citys.city[$scope.edit[2]];
      $scope.edit[3]=$scope.citys[0];
    }
    $scope.edit[2]=citys.provinces[0];
    var req={t:new Date().getTime()};
    $http.get(CONFIG.DATA + 'index/address', {params:req}).then(function(r) {
      var d = r.data;
      if(d.flag && d.result){
        $scope.myAddress=d.result.split('$');
      }else{
        $scope.myAddress=[];
      }
    });
    $scope.removeAddress=function(i){
      myDialog.confirm($scope,'确认删除该地址么?',function(){
        $scope.myAddress.splice(i,1);
        var req={
          address:$scope.myAddress.join('$')
        }
        _(req);
      });
    }
    $scope.saveAddress=function(){
      var h=$scope.edit.join(',');
      if($scope.isAdd){
        $scope.myAddress.splice(0,0,h);
      }else{
        $scope.myAddress[$scope.key]=h;
      }
      if(!$scope.edit[0]||!$scope.edit[1]||!$scope.edit[2]||!$scope.edit[3]||!$scope.edit[4]){
        return myDialog.tip($scope,'信息不为空',$timeout);
      }
      var req={
        address:$scope.myAddress.join('$')
      }
      _(req);
    }
    function _(req){
      $scope.loading=true;
      $http.post(CONFIG.DATA + 'index/address_save', req).then(function(r) {
        $scope.loading=false;
        var d = r.data;
        if(d.flag==1){
          myDialog.alert($scope,d.msg,function(){
            $scope.openAddressEdit=false;
          });
        }else{
          myDialog.tip($scope,d.msg,$timeout);
        }
      });
    }
    $scope.set=function(x){
      $scope.isSelected = true;  
      $scope.key=x;
    }
    $scope.getClass=function(x){
      if(x==$scope.key){
        return 'cur';
      }
    }
    $scope.buy=function(){
      if($scope.myAddress[$scope.key]){
        myDialog.confirm($scope,'确认下单么',function(){
          var good=$scope.items,goods=[],i=0,len=good.length,size,
            add=$scope.myAddress[$scope.key].split(','),
            req={
              nickname:add[0],
              phone:add[1],
              shen:add[2],
              shi:add[3],
              address:add[4]
            };
          for (i; i <len; i++) {
            size=good[i].title.split(',');
            size.splice(0,1);
            size=size.join('-');
            goods.push(good[i].id+','+good[i].pid+','+good[i].num+','+size+','+good[i].image+','+good[i].desc);
            // 库存ID，产品ID，购买数量，名称，图片，规格
          }
          req.goods=goods.join('$');
          $scope.loading=true;
          $http.post(CONFIG.DATA + 'order/buy', req).then(function(r) {
            var d = r.data;
            $scope.loading=false;
            if(d.flag==1){
              myDialog.alert($scope,d.msg,function(){
                car.set([]);
                $location.path('/order_detail/'+d.order_id);
              });
            }else{
              myDialog.tip($scope,d.msg,$timeout);
            }
          });
        });
      }else{
        myDialog.tip($scope,'请选择地址',$timeout);
      }
    }
    $scope.openAddressListBtn=function(){
      if($scope.total>0){
        $scope.openAddressList=true;
      }else{
        myDialog.tip($scope,'购物车里没有东西',$timeout);
      }
    }
  })
  .controller('service',function($scope, $rootScope, $http, car){
    $rootScope.app_title = "服务与支持";
    loadShare({
      title:"7B12",
      summary:"7B12",
      icon:DOMAIN+"app/res/app/image/logo.png",
      url:DOMAIN
    });
    var car_content = car.get();
    $scope.car_count = car_content.length;
  })
  .controller('order_detail', function($scope, $rootScope, $http, $location,$routeParams,$timeout, car, myDialog,citys){
      var id=$routeParams.id,
        type=$routeParams.t,
        page=$routeParams.p;
      $scope.__PUBLIC__ = CONFIG.IMG;
      var req={id:id};
      load();
      loadShare({
        title:"7B12",
        summary:"7B12",
        icon:DOMAIN+"app/res/app/image/logo.png",
        url:DOMAIN
      });
      function load(){
        $scope.loading=true;
        $http.get(CONFIG.DATA + 'order/detail', {params:req}).then(function(r) {
          $scope.loading=false;
          var r=r.data;
          if(r.flag==1){
            $scope.products=r.order_detail;
            $scope.d=r.order;
            var status=r.order.status,tf=false;
            if(status==4||status==5||status==6){
              tf=true;
            }else if(status==1){
              $scope.count=r.endtime;
              count();
            }
            $scope.has_send=tf;
          }else{
            myDialog.alert($scope,r.msg,function(){
              $location.path('/home');
            })
          }
        });
      }
      function count(){
        if($scope.count>0){
          $scope.count--;
          $scope.count_txt=new Date($scope.count*1000).getMinutes()+"分"+new Date($scope.count*1000).getSeconds()+"秒";
          $timeout(function(){
            count();
          },1000);
        }else if($scope.count===0){
          load();
        }
      }
      $scope.back=function(){
        var url='';
        if(type||type==0){
          url+="/"+type;
        }
        if(page||page==0){
          url+="/"+page;
        }
        $location.path('/home'+url);
      }
      $scope.callbackurl=CONFIG.WEB+"#!/order_detail/"+id;
      $scope.cancel=function(){
        myDialog.confirm($scope,'确定要取消订单么',function(){
          var req={id:id};
          $scope.loading=true;
          $http.get(CONFIG.DATA + 'order/cancel', {params:req}).then(function(r) {
            $scope.loading=false;
            var r=r.data;
            if(r.flag==1){
              myDialog.alert($scope,r.msg,function(){
                load();
              });
            }else{
              myDialog.alert($scope,r.msg);
            }
          });
        });
      }
      $scope.check=function(){
        myDialog.confirm($scope,'您确认已经收到货了么?','您确认已经收到货了么?',function(){
          var req={id:id};
          $scope.loading=true;
          $http.get(CONFIG.DATA + 'order/check', {params:req}).then(function(r) {
            $scope.loading=false;
            var r=r.data;
            if(r.flag==1){
              myDialog.alert($scope,r.msg,function(){
                load();
              });
            }else{
              myDialog.alert($scope,r.msg);
            }
          });
        });
      }

  })
  .controller('home',function($scope, $rootScope, $http, $location,$timeout,$routeParams, car, myDialog,citys){
    $rootScope.app_title = "我的订单";
    var car_content = car.get();
    loadShare({
      title:"7B12",
      summary:"7B12",
      icon:DOMAIN+"app/res/app/image/logo.png",
      url:DOMAIN
    });
    $scope.car_count = car_content.length;
    $scope.__PUBLIC__ = CONFIG.IMG;
    var type=$routeParams.t,
     page=$routeParams.p;
    if(!type){
      type=1;
    }
    $scope.type=type;
    if(!page){
      page=0;
    }else{
      page=Number(page);
    }
    $scope.page=page;
    $scope.select=function(i){
      $scope.type=i;
      $scope.page=0;
      load();
    }
    $scope.items=[];
    $scope.total=0;
    function load(){
      var req={p:$scope.page,t:$scope.type};
      $scope.loading = true;
      $http.get(CONFIG.DATA + 'order/index', {params:req}).then(function(r) {
        $scope.loading = false;
        var d = r.data;
        if (d.flag == 1 && d.result) {
          $scope.items=d.result;
          $scope.total=d.total_page;
        }else{
          $scope.items=[];
          $scope.total=1;
          $scope.page=0;
        }
      });
    }
    load();
    $scope.prev=function(){
      if($scope.page>0){
        $scope.page--;
        load();
      }
    }
    $scope.next=function(){
      if($scope.page<$scope.total-1){
        $scope.page++;
        load();
      }
    }
    $scope.order_detail=function(id){
      $location.path('/order_detail/'+id+'/'+$scope.type+'/'+$scope.page);
    }

  })
;
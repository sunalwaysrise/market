'use strict';
angular.module('app.controllers', []).controller('today_order', function($scope,$http,$stateParams,toastr,myDialog) {
  Pace.restart();
  function load(){
    $http.get(CONFIG.DATA + 'order/today').then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.today_unsend_order=r.today_unsend_order;
        $scope.today_finished_order=r.today_finished_order;
        $scope.today_total_order=r.today_total_order;
      }else{
        toastr.error(r.msg);
      }
    },function(){});
  }
  load();
  $scope.page=function(){
    load();
  }
}).controller('order', function($scope,$http,$stateParams,toastr,myDialog) {
  Pace.restart();

   $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();
    $scope.clear = function() {
        $scope.dt = null;
        $scope.dt2 = null;
    };
    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };
    $scope.dateOptions = {
        // dateDisabled: disabled,//禁止选择周末
        // formatYear: 'yy',
        // maxDate: new Date(2020, 5, 22),//最大日期
        // minDate: new Date(),//最小日期
        startingDay: 1
    };
    // 禁止选择周末
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }
    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
    $scope.toggleMin();
    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };
    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };
    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, (month-1), day);
    };
    $scope.formats = [ 'yyyy/MM/dd', 'dd-MMMM-yyyy','dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];
    $scope.popup1 = {
        opened: false
    };
    $scope.popup2 = {
        opened: false
    };
    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);
            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }
        return '';
    }
    
  $scope.order_status=[
    {id:0,value:'不限'},
    {id:1,value:'待付款'},
    {id:2,value:'已支付'},
    {id:3,value:'待发货'},
    {id:4,value:'已发货'},
    {id:5,value:'已签收'},
    {id:6,value:'已完成'},
    {id:7,value:'已过期'},
    {id:8,value:'已取消'}
  ];
  function load(){
    var req={};
    if($scope.begin_time){
      req.begin_time=$scope.begin_time;
    }
    if($scope.end_time){
      req.end_time=$scope.end_time;
    }
    if($scope.status){
      req.status=$scope.status;
    }
    if($scope.paycode){
      req.paycode=$scope.paycode;
    }
    if($scope.nickname){
      req.nickname=$scope.nickname;
    }
    req.p=$scope.p;
    $http.get(CONFIG.DATA + 'order/index',{params:req}).then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.items=r.result;
        $scope.page_size=r.page_size;
        $scope.current_page=r.current_page;
        $scope.total_items=r.total_items;
        $scope.maxSize=8;
      }else{
        toastr.error(r.msg);
      }
    },function(){});
  }
  load();
  $scope.page=function(){
    load();
  }
  $scope.search=function(){
    $scope.p=1;
    load();
  }

  $scope.order_sync = function() {
    myDialog.confirm($scope, '操作提示', '该操作需要消耗大量性能，请避开高峰期', function() {
      $http.get(CONFIG.DATA + 'business/order_sync').then(function(r){},function(){});
    }, function() {});
  }

}).controller('order_detail', function($scope,$http,$stateParams,toastr,myDialog) {
  Pace.restart();
  var id = $stateParams.id,
    req={id:id};
  $scope.__PUBLIC__=CONFIG.IMG;
  function load(){
    $scope.loading=true;
    $http.get(CONFIG.DATA + 'order/detail',{params:req}).then(function(r){
      $scope.loading=false;
      r=r.data;
      if(r.flag==1){
        $scope.d=r.summary;
        $scope.items=r.detail;
        $scope.managetip_txt=r.summary.managetip;
        $scope.to_order_status=r.summary.status;
        $scope.nickname_txt=r.summary.nickname;
        $scope.phone_txt=r.summary.phone;
        $scope.address_txt=r.summary.address;
        $scope.kdname=r.summary.kdname;
        $scope.kdcode=r.summary.kdcode;
      }else{
        toastr.error(r.msg);
      }
    },function(){});
  }
  load();
  $scope.managetiped= function() {
    $scope.loading=true;
    var req={
      id:id,
      managetip:$scope.managetip_txt
    }
    $http.get(CONFIG.DATA + 'order/managetip',{params:req}).then(function(r){
      $scope.loading=false;
      r=r.data;
      if(r.flag==1){
        $scope.locked=true;
        $scope.d.managetip=req.managetip;
        toastr.success(r.msg);
        $scope.show_managetip_dialog=false;
      }else{
        toastr.error(r.msg);
      }
    }, function() {});
  }

  $scope.change_logistics = function() {
    $scope.loading=true;
    var req={
      id:id,
      nickname:$scope.nickname_txt,
      phone:$scope.phone_txt,
      address:$scope.address_txt
    };
    $http.get(CONFIG.DATA + 'order/change_logistics',{params:req}).then(function(r){
      $scope.loading=false;
      r=r.data;
      if(r.flag==1){
        $scope.d.nickname=req.nickname;
        $scope.d.phone=req.phone;
        $scope.d.address=req.address;
        toastr.success(r.msg);
        $scope.show_logistics_dialog=false;
      }else{
        toastr.error(r.msg);
      }
    }, function() {});
  }

  $scope.order_status_items=[
    {id:0,value:'不限'},
    {id:1,value:'待付款'},
    {id:2,value:'已支付'},
    {id:3,value:'待发货'},
    {id:4,value:'已发货'},
    {id:5,value:'已签收'},
    {id:6,value:'已完成'},
    {id:7,value:'已过期'},
    {id:8,value:'已取消'}
  ];
  $scope.change_status = function() {
    myDialog.confirm($scope,'修改状态','确认做该操作么？',function(){
      $scope.loading=true;
      var req={
        id:id,
        status:$scope.to_order_status
      };
      $http.get(CONFIG.DATA + 'order/change_status',{params:req}).then(function(r){
        $scope.loading=false;
        r=r.data;
        if(r.flag==1){
          $scope.show_status_dialog=false;
          load();
          toastr.success(r.msg);
        }else{
          toastr.error(r.msg);
        }
      }, function() {});
    });
  }

  $scope.logistics=[
    {id:"shentong",value:"申通"},
    {id:"shunfeng",value:"顺丰"},
    {id:"tiantian",value:"天天快递"},
    {id:"yuantong",value:"圆通速递"},
    {id:"yunda",value:"韵达快运"},
    {id:"ems",value:"ems快递"},
    {id:"zhaijisong",value:"宅急送"},
    {id:"zhongtong",value:"中通速递"},
    {id:"huitongkuaidi",value:"汇通快运"},
    {id:"sue",value:"速尔快递"},
    {id:"self",value:"自提"}
  ];
  $scope.send_goods = function() {
    $scope.loading=true;
    var kd=document.getElementById('kd'),
      index = kd.selectedIndex,
      req={
        id:id,
        kd:kd[index].text,
        kdname:$scope.kdname,
        kdcode:$scope.kdcode
      };
    $http.get(CONFIG.DATA + 'order/send_goods',{params:req}).then(function(r){
      $scope.loading=false;
      r=r.data;
      if(r.flag==1){
        toastr.success(r.msg);
        $scope.show_send_dialog=false;
        load();
      }else{
        toastr.error(r.msg);
      }
    }, function() {});
  }

  

  $scope.print=function () {
    window.print();
  }


});
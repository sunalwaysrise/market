'use strict';
angular.module('app.controllers', []).controller('member', function($scope,$http,$stateParams,toastr,myDialog) {
  Pace.restart();
  function load(){
    var req={};
    if($scope.nickname){
      req.nickname=$scope.nickname;
    }
    if($scope.realname){
      req.realname=$scope.realname;
    }
    req.p=$scope.p;
    $http.get(CONFIG.DATA + 'member/index',{params:req}).then(function(r){
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
}).controller('member_detail', function($scope,$http,$stateParams,toastr,myDialog) {
  Pace.restart();

  var id = $stateParams.id,
    req={id:id};
  $http.get(CONFIG.DATA + 'member/detail',{params:req}).then(function(r){
    r=r.data;
    if(r.flag==1){
      $scope.d=r.result;
    }else{
      toastr.error(r.msg);
    }
  },function(){});

  $scope.lock = function() {
    myDialog.confirm($scope, '操作提示', '确认把他设置为销售代表么', function() {
      $scope.loading=true;
      $http.get(CONFIG.DATA + 'member/changeStatus/id/'+id).then(function(r){
        $scope.loading=false;
        r=r.data;
        if(r.flag==1){
          $scope.locked=true;
          toastr.success(r.msg);
        }else{
          toastr.error(r.msg);
        }
      },function(){
        $scope.loading=false;
      });
    }, function() {});
  }
})
.controller('member_order', function($scope,$http,$stateParams,toastr,myDialog) {
  Pace.restart();
  var id = $stateParams.id;
  function load(){
    var req={};
    if($scope.nickname){
      req.nickname=$scope.nickname;
    }
    if($scope.realname){
      req.realname=$scope.realname;
    }
    req.p=$scope.p;
    req.id=id;
    $http.get(CONFIG.DATA + 'member/order',{params:req}).then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.items=r.result;
        $scope.user=r.user;
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
})
;
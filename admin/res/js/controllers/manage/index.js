'use strict';
angular.module('app.controllers', []).controller('manage', function($scope,$http,$resource,toastr,myDialog) {
  Pace.restart();
  function load(){
    $http.get(CONFIG.DATA + 'manage/index').then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.items=r.result;
      }else{
        toastr.error(r.msg);
      }
    },function(){});
  }
  load();
  $scope.deleted = function(id) {
    myDialog.confirm($scope, '操作提示', '确认删除么', function() {
      $scope.loading=true;
      $http.get(CONFIG.DATA + 'manage/deleted/id/'+id).then(function(r){
        $scope.loading=false;
        r=r.data;
        if(r.flag==1){
          load();
          toastr.success(r.msg);
        }else{
          toastr.error(r.msg);
        }
      },function(){
        $scope.loading=false;
      });
    }, function() {});
  }
  $scope.locked = function(id) {
    myDialog.confirm($scope, '操作提示', '确认锁定么', function() {
      $scope.loading=true;
      $http.get(CONFIG.DATA + 'manage/locked/id/'+id).then(function(r){
        $scope.loading=false;
        r=r.data;
        if(r.flag==1){
          load();
          toastr.success(r.msg);
        }else{
          toastr.error(r.msg);
        }
      },function(){
        $scope.loading=false;
      });
    }, function() {});
  }
}).controller('manage_detail', function($scope,$http,$stateParams,uiUploader,toastr){
  $scope.rbacs=[
    {id:1,name:'管理员'},
    {id:2,name:'产品'},
    {id:3,name:'销售代表'},
    {id:4,name:'首页广告'},
    {id:5,name:'评论'},
    {id:6,name:'会员'},
    {id:7,name:'订单'},
    {id:8,name:'报表'}
  ];
  $scope.rbac=[];
  $scope.isChecked = function(id){  
    return $scope.rbac.indexOf(id) >= 0 ;  
  };
  $scope.updateSelection = function($event,id){  
    var checkbox = $event.target ;  
    var checked = checkbox.checked;
    if(checked){
      $scope.rbac.push(id);
    }else{  
      var idx = $scope.rbac.indexOf(id);
      $scope.rbac.splice(idx,1) ;  
    }
  };
  var id = $stateParams.id,
    status=['否','是'],
    status2={'否':0,'是':1};
  if(id==0){
    $scope.title='添加管理员';
  }else{
    $scope.title='管理员详情';
    var req={id:id};
    $http.get(CONFIG.DATA + 'manage/detail',{params:req}).then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.loading=false;
        $scope.d=r.result;
        var rbac=r.result.rbac.split(','),i=0,len=rbac.length;
        for(i;i<len;i++){
          $('#rbac_'+rbac[i]).attr("checked", true);
        }
        $scope.status=status[r.result.status];
      }else{
        toastr.error(r.msg);
      }
    },function(){
      $scope.loading=false;
    });
  }
  $scope.save=function(){
    var d=$scope.d,i=0,rbac=[];
    d.status=status2[$scope.status];
    if(!d.username){ return toastr.error('登录名不能为空');}
    if(!d.id && !d.password){
      return toastr.error('新增用户密码不能为空');
    }
    if(d.password){
      if(d.password!=d.password2){
        return toastr.error('两次输入的密码不一致');
      }
    }
    d.rbac=$scope.rbac.join(',');
    $("input[name='rbac']:checkbox:checked").each(function(i,v){
      rbac.push($(v).val());
    });
    d.rbac=rbac.join(',');
    $scope.loading=true;
    $http.post(CONFIG.DATA + 'manage/saved',d).then(function(r){
      $scope.loading=false;
      r=r.data;
      if(r.flag==1){
        toastr.success(r.msg);
      }else{
        toastr.error(r.msg);
      }
    });
  }


})
;
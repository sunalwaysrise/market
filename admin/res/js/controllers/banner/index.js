'use strict';
angular.module('app.controllers', []).controller('banner', function($scope,$http,$stateParams,uiUploader,toastr,myDialog) {
  Pace.restart();
  $scope.__PUBLIC__=CONFIG.IMG;
  function load(){
    $http.get(CONFIG.DATA + 'banner/index').then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.items=r.result;
      }else{
        toastr.error(r.msg);
      }
    },function(){});
  }
  load();
  $scope.save_az=function(){
    $scope.loading=true;
    var i=0,len=$scope.items.length,ids=[],azs=[],req;
    for(i;i<len;i++){
      ids.push($scope.items[i].bid);
      azs.push(i);
    }
    req={ids:ids.join(','),azs:azs.join(',')};
    $scope.loading=true;
    $http.post(CONFIG.DATA + 'banner/az_banner',req).then(function(r){
      $scope.loading=false;
      r=r.data;
      if(r.flag==1){
        toastr.success(r.msg);
      }else{
        toastr.error(r.msg);
      }
    },function(){
      $scope.loading=false;
    });
  }
  $scope.delete_banner = function(id) {
    myDialog.confirm($scope, '操作提示', '确认删除么', function() {
      $scope.loading=true;
      $http.get(CONFIG.DATA + 'banner/delete_detail/id/'+id).then(function(r){
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

}).controller('banner_detail', function($scope,$http,$stateParams,uiUploader,toastr){
  Pace.restart();
  var id = $stateParams.id;
  if(id==0){
    $scope.title='添加首页广告';
  }else{
    $scope.title='首页广告详情';
    var req={id:id};
    $http.get(CONFIG.DATA + 'banner/detail',{params:req}).then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.loading=false;
        $scope.d=r.result;
        if(r.result.image){
          $scope.images=[r.result.image];
        }
      }else{
        toastr.error(r.msg);
      }
    },function(){
      $scope.loading=false;
    });
  }
  $scope.save=function(){
    var d=$scope.d,i=0;
    if(!d.title){ return toastr.error('名称不能为空');}
    d.image=$scope.images[0];
    $scope.loading=true;
    $http.post(CONFIG.DATA + 'banner/update_detail',d).then(function(r){
      $scope.loading=false;
      r=r.data;
      if(r.flag==1){
        toastr.success(r.msg);
      }else{
        toastr.error(r.msg);
      }
    });
  }
  $scope.__PUBLIC__=CONFIG.IMG;
  $scope.images=[];
  $scope.remove=function(x){
    $scope.images=[];
  }
  $scope.btn_remove = function(file) {
    uiUploader.removeFile(file);
  };
  $scope.btn_clean = function() {
    uiUploader.removeAll();
  };
  $scope.btn_upload = function() {
    $scope.loading=true;
    console.log('uploading...');
    uiUploader.startUpload({
      url: CONFIG.DATA+'banner/upload',
      concurrency: 1,
      onProgress: function(file) {
        $scope.$apply();
      },
      onCompleted: function(file, response) {
        // console.log(file + 'response' + response);
        uiUploader.removeFile(file);
        response=eval("("+response+")");
        console.log(response.msg);
        $scope.images=[response.msg];
        $scope.$apply();
      },
      onCompletedAll: function(files) {
        //全部上传完毕
        document.getElementById('file1').value="";
        $scope.loading=false;
        $scope.$apply();
      }
    });
  };
  $scope.files = [];
  var element = document.getElementById('file1');
  element.addEventListener('change', function(e) {
      var files = e.target.files;
      uiUploader.addFiles(files);
      $scope.files = uiUploader.getFiles();
      $scope.$apply();
  });
})
;
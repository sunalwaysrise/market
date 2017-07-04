'use strict';
angular.module('app.controllers', []).controller('home', function($scope,$http,toastr) {
  Pace.restart();
  $scope.__PUBLIC__=CONFIG.IMG;
  $http.get(CONFIG.DATA + 'index/index').then(function(r){
    r=r.data;
    if(r.flag==1){
      $scope.d=r;
    }else{
      toastr.error(r.msg);
    }
  },function(){});
});
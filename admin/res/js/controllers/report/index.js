'use strict';
angular.module('app.controllers', []).controller('fans', function($scope,$http,toastr,myDialog) {
  Pace.restart();
  $scope.season=12;
  $scope.reload=function(){
    load();
  }
  load();
  function load(){
    var req={id:$scope.season};
    if(isNaN(req.id)){
      return toastr.error('请输入数字');
    }else if(req.id<1 || req.id>24){
      return toastr.error('查询时间为1-24个月');
    }
    $scope.loading=true;
    $http.get(CONFIG.DATA + 'report/fans',{params:req}).then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.season_txt=req.id;
        $scope.d=r.result;
        var line_labels=[],line_data=[],i=0,len=r.result.length;
        for(i;i<len;i++){
          line_labels.push(r.result[i].time);
          line_data.push(r.result[i].num);
        }
        $scope.line_labels=line_labels;
        $scope.line_data=[line_data];
      }else{
        toastr.error(r.msg);
      }
    },function(){});
  }
  $scope.line_options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            beginAtZero:true
          }
        }
      ]
    }
  };
  $scope.line_override=[
      {
          label:"出库",
          backgroundColor: 'rgba(54,162,235, 0.2)',
          borderColor: 'rgba(54,162,235, 1)',
          borderWidth: 1,
          yAxisID: 'y-axis-1'
      }
  ];

}).controller('order_report', function($scope,$http,toastr,myDialog) {
  Pace.restart();
  $scope.season=12;
  $scope.reload=function(){
    load();
  }
  load();
  function load(){
    var req={id:$scope.season};
    if(isNaN(req.id)){
      return toastr.error('请输入数字');
    }else if(req.id<1 || req.id>24){
      return toastr.error('查询时间为1-24个月');
    }
    $scope.loading=true;
    $http.get(CONFIG.DATA + 'report/order',{params:req}).then(function(r){
      r=r.data;
      if(r.flag==1){
        $scope.season_txt=req.id;
        $scope.d=r.result;
        var line_labels=[],line_data=[],i=0,len=r.result.length;
        for(i;i<len;i++){
          line_labels.push(r.result[i].time);
          line_data.push(r.result[i].price);
        }
        $scope.line_labels=line_labels;
        $scope.line_data=[line_data];
      }else{
        toastr.error(r.msg);
      }
    },function(){});
  }
  $scope.line_options = {
      scales: {
          yAxes: [
              {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left',
                  ticks: {
                      beginAtZero:true
                  }
              }
          ]
      }
  };
  $scope.line_override=[
      {
          label:"元",
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          yAxisID: 'y-axis-1'
      }
  ];

})
.controller('product_report', function($scope,$http,toastr,myDialog){
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.clear = function() {
    $scope.dt = null;
    $scope.dt2 = null;
  };
  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };
  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, (month - 1), day);
  };
  $scope.format = 'yyyy-MM-dd';
  $scope.popup1 = {
    opened: false
  };
  $scope.popup2 = {
    opened: false
  };
  $scope.search=function(){
    var req={
      begin_time:$scope.dt,
      endti_me:$scope.dt2,
    };
    $http.get(CONFIG.DATA+'report/goods',{params:req}).then(function(r){
      r=r.data;
      if(r.flag==1){
        var i=0,d=r.result,len=0,entry_name=[],entry_count=[];
        if(d){
          len=d.length;
        }
        for(i;i<len;i++){
          entry_name.push(d[i].title);
          entry_count.push(d[i].price);
        }
        $scope.entry_name=entry_name;
        $scope.entry_count=entry_count;
      }
    });
  }

    $scope.line_override_entry=['#00ADF9'];
    $scope.line_override_delivery=['rgb(253,180,92)'];
    $scope.line_override_broken=['rgb(247,70,74)'];
    $scope.line_override_return=['rgb(70,191,189)'];
    $scope.line_option={
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    };

})
;
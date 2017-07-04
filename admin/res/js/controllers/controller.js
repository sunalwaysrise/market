'use strict';
var appControllers = angular.module('app.controllers', []);
appControllers
    .controller('signin', function($scope, $http, $location, toastr) {
        var user_info=localStorage.getItem('user_info');
        $scope.user = {};
        $scope.verify_url=CONFIG.DATA+"Login/verify";
        $scope.reload=function(){
            $scope.verify_url=CONFIG.DATA+"Login/verify?"+new Date().getTime();
        }
        if(user_info){
            user_info=eval("("+user_info+")");
            $scope.user.username=user_info.username;
            $scope.user.remember=user_info.remember;
            if(user_info.remember){
                $scope.user.password=user_info.password;
            }
        }
        $scope.signIn = function() {
            if (!$scope.user.username || !$scope.user.password) {
                return toastr.error('用户名、密码均不能为空', '错误');
            }
            $http.get(CONFIG.DATA + 'Login/signIn', {
                params: $scope.user
            }).then(function(rs) {
                var r=rs.data;
                if (r.flag == 1) {
                    if($scope.user.remember){
                        var user_info=$scope.user;
                        localStorage.setItem('user_info',JSON.stringify(user_info));
                    }
                    $("div.container").fadeOut("slow");
                    $location.path('/app/home');
                } else {
                    return toastr.error(r.msg, '登录失败');
                }
            });

        };
    })
    .controller('home', function($scope, $http, $location,$timeout,myDialog, toastr) {
            var now = new Date(),
            month = now.getMonth() + 1,
            year = now.getFullYear();

            $scope.calendar_event=[
                [
                    '2/'+month+'/'+year,
                    '待办事项',
                    '#',
                    app.settings.colors['brand-primary'],
                    '出差报销'
                ],
                [
                    '5/'+month+'/'+year,
                    '紧急任务',
                    '#',
                    app.settings.colors['brand-warning'],
                    '处理系统提交的BUG'
                ],
                [
                    '18/'+month+'/'+year,
                    '日程安排',
                    '#',
                    app.settings.colors['brand-success'],
                    '出差'
                ],
                [
                    '29/'+month+'/'+year,
                    '链接',
                    'https://www.wenbin.lu',
                    app.settings.colors['brand-danger']
                ]
            ];

      $scope.myconfirm = function() {
        myDialog.confirm($scope, '操作提示', '确认退出账号么', function() {
          console.log('确定');
        }, function() {
          console.log('取消');
        });
      }
      $scope.myalert = function() {
        myDialog.alert($scope, '确认退出账号么', function() {
          console.log('确定了');
        });
      }
      $scope.load = function() {
        $scope.loading = true;
        $timeout(function() {
            $scope.loading = false;
        }, 2000)
      }
      $scope.mytip = function() {
        myDialog.tip($scope, '告诉你...', $timeout);
      }
  })
    .controller('me',function($scope, $http, $location,$timeout,myDialog, toastr){
        $scope.d={};
        $scope.save=function() {
            if(!$scope.d.oldpassword){return toastr.error('旧密码不能为空');}
            if(!$scope.d.password){return toastr.error('新密码不能为空');}
            if(!$scope.d.password2){return toastr.error('确认密码不能为空');}
            if($scope.d.password2!=$scope.d.password){
                return toastr.error('两次输入的密码不一致');
            }
            var d = $scope.d;
            $scope.loading = true;
            $http.post(CONFIG.DATA + 'my/save', d).then(function(r) {
                $scope.loading = false;
                r = r.data;
                if (r.flag == 1) {
                    toastr.success(r.msg);
                } else {
                    toastr.error(r.msg);
                }
            });
        }
    })
    .controller('signout',function($scope, $http,$location){
        $scope.loading=true;
        $http.get(CONFIG.DATA + 'index/signOut').then(function(r) {
            $scope.loading=false;
            $location.path('access.signin')
        });
    })
;

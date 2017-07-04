/**
 * Created by Administrator on 2017/3/15.
 */
angular.module('app.controllers', []).controller('bootstrapmodal', function($scope,$uibModal) {
    Pace.restart();

    $scope.data={
        items : ['item1', 'item2', 'item3'],
        title:"标题部分"
    };
    $scope.animationsEnabled = false;
    $scope.open = function (size) {
        //这里很关键,是打开模态框的过程
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,//打开时的动画开关
            templateUrl: 'myModalContent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
            controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
            size: size,//模态框的大小尺寸
            resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                data: function () {//items是一个回调函数
                    return $scope.data;//这个值会被模态框的控制器获取到
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
            $scope.selected = selectedItem;//模态框的返回值

        }, function () {
            //取消操作
            console.log('关闭窗口' + new Date());
        });
    };
    $scope.open2 = function (size) {
        alert(2)
        //这里很关键,是打开模态框的过程
        var modalInstance2 = $uibModal.open({
            animation: $scope.animationsEnabled,//打开时的动画开关
            templateUrl: 'myModalContent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
            controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
            size: size,//模态框的大小尺寸
            resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                data: function () {//items是一个回调函数
                    return $scope.data;//这个值会被模态框的控制器获取到
                }
            }
        });
        modalInstance2.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
            $scope.selected = selectedItem;//模态框的返回值

        }, function () {
            //取消操作
            console.log('关闭窗口' + new Date());
        });
    };
    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}).controller('ModalInstanceCtrl', function ($scope, $uibModal,$uibModalInstance, data) {
    //这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
    $scope.items = data.items;//这里就可以去外层主控制器的数据了
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.open2 = function (size) {
        //这里很关键,是打开模态框的过程
        var modalInstance2 = $uibModal.open({
            animation: $scope.animationsEnabled,//打开时的动画开关
            templateUrl: 'myModalContent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
            controller: 'ModalInstanceCtrl1',//这是模态框的控制器,是用来控制模态框的
            size: size,//模态框的大小尺寸
            resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                data: function () {//items是一个回调函数
                    return $scope.data;//这个值会被模态框的控制器获取到
                }
            }
        });
        modalInstance2.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数


        }, function () {
            //取消操作
            console.log('关闭窗口' + new Date());
        });
    };
    $scope.title=data.title;
    $scope.ok = function () {
        //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
        $uibModalInstance.close($scope.selected.item);
    };
    $scope.cancel = function () {
        //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
        $uibModalInstance.dismiss('cancel');
    };
}).controller('ModalInstanceCtrl1',function ($scope,$uibModalInstance, data) {
    $scope.title='确认要删除么';
    $scope.ok = function () {
        //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
        console.log('确认了2');
        $uibModalInstance.dismiss('cancel');
    };
    $scope.cancel = function () {
        //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
        $uibModalInstance.dismiss('cancel');
    };
})

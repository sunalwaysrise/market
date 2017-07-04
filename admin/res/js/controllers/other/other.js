/**
 * Created by wenbin.lu on 2017/3/30.
 */
angular.module('app.controllers', []).controller('invoice', function($scope,$resource) {
    Pace.restart();
    $scope.print=function () {
        window.print();
    }
    var products = $resource('demo/json/product.json').query(function () {
        calc();
    });
    $scope.products=products;
    function calc(){
        var total=0;
        $scope.products.forEach(function (v, i, a) {
            total+= v.quantity*v.price;
        });
        total=total.toFixed(2);
        $scope.total=total;
        var tax=(total*17/100).toFixed(2);
        $scope.tax=tax;
        $scope.total2=(parseInt(total)+parseInt(tax)).toFixed(2);
    }
    ;
}).controller('grid', function($scope,$resource) {
    Pace.restart();
    var t1 = $resource('demo/json/marquez.json').query(function () {
        $scope.t1=t1[0];
    });
    var t2 = $resource('demo/json/shelley.json').query(function(){
        $scope.t2=t2[0];
    });
    var people = $resource('demo/json/author.json').query();
    $scope.t3=people;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

}).controller('timeline', function($scope,$resource) {
    Pace.restart();
    var people = $resource('demo/json/author.json').query(function () {
        $scope.t1=people;
        $scope.t1.forEach(function (v, i, a) {
            if( i%2 != 1){
                v.class='on-left';
            }else{
                v.class='';
            }
        });
    });
}).controller('calendar', function($scope) {
    Pace.restart();
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
});

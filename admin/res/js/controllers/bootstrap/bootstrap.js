/**
 * Created by Administrator on 2017/3/14.
 */
angular.module('app.controllers', []).controller('bootstrap', function($scope) {
    Pace.restart();
    /**手风琴*/
    $scope.accordion={
        oneAtATime:true,
        status : {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        }
    };
    $scope.accordion_items=['Item 1', 'Item 2', 'Item 3'];
    $scope.accordion_items_add=function() {
        var newItemNo = $scope.accordion_items.length + 1;
        $scope.accordion_items.push('Item ' + newItemNo);
    }
    $scope.accordiongroups= [
        {
            title: '头部内容',
            content: '详情部分'
        },
        {
            title: '头部内容2',
            content: '详情部分2'
        }
    ];

    /**提示信息*/
    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };
    $scope.alerts=[
        { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
    ];
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    /**按钮*/
    $scope.singleModel = 1;
    $scope.radioModel = 'Middle';
    $scope.checkModel = {
        A: false,
        B: true,
        C: false
    };
    $scope.checkResults = [];
    $scope.$watchCollection('checkModel', function () {
        $scope.checkResults = [];
        angular.forEach($scope.checkModel, function (value, key) {
            if (value) {
                $scope.checkResults.push(key);
            }
        });
    });

    /**折叠*/
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;

    /** 时间选择*/
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };
    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };
    $scope.changed = function () {
        console.log('时间: ' + $scope.mytime);
    };
    $scope.clear = function() {
        $scope.mytime = null;
    };

    /**日期选择*/
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
        dateDisabled: disabled,//禁止选择周末
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),//最大日期
        minDate: new Date(),//最小日期
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

    /**下拉选项*/
    $scope.toggleitems = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];
    $scope.togglestatus = {
        isopen: false
    };
    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };

    /** 分页*/
    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    /**评分*/
    $scope.max = 100;
    $scope.random = function() {
        var value = Math.floor(Math.random() * 100 + 1);
        var type;
        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }
        $scope.showWarning = type === 'danger' || type === 'warning';
        $scope.dynamic = value;
        $scope.type = type;
    };
    $scope.random();
    $scope.randomStacked = function() {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];
        for (var i = 0, n = Math.floor(Math.random() * 4 + 1); i < n; i++) {
            var index = Math.floor(Math.random() * 4);
            $scope.stacked.push({
                value: Math.floor(Math.random() * 30 + 1),
                type: types[index]
            });
        }
    };
    $scope.randomStacked();

    /**选项卡*/
    $scope.tabs=[
        {title:"第一",content:"第一部分文字内容",disabled:false},
        {title:"第二(点不了)",content:"第二部分内容",disabled:true},
        {title:"第三",content:"第三部分内容",disabled:false},
        {title:"第四",content:"第四部分内容",disabled:false}
    ];

    /**评分*/
    $scope.rate = 7;
    $scope.ratemax = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.ratemax);
    };
    $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];

    /**自动补全*/
    $scope.states =['北京市','天津市','河北省','山西省','内蒙古自治区','辽宁省','吉林省','黑龙江省','上海市','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省','广东省','广西壮族自治区','海南省','重庆市','四川省','贵州省','云南省','西藏自治区','陕西省','甘肃省','青海省','宁夏回族自治区','新疆维吾尔自治区'];

    /**轮播*/
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    $scope.slides = [
        {image: 'demo/image/300.jpg', text:'', id: 0},
        {image: 'demo/image/400.jpg', text:'', id: 1},
        {image: 'demo/image/500.jpg', text:'', id: 2},
        {image: 'demo/image/600.jpg', text:'', id: 3}
    ];



});
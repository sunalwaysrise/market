'use strict';
var appDirectives = angular.module('app.directives', []);
appDirectives.directive('alert',function(){
  return {
    scope:{
      sure:"&",
      txt:"@"
    },
    restrict:'E',
    template:'<div class="js_dialog">'+
            '<div class="weui-mask"></div>'+
            '<div class="weui-dialog">'+
                '<div class="weui-dialog__bd">{{txt}}</div>'+
                '<div class="weui-dialog__ft">'+
                    '<a ng-click="sure();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>'+
                '</div>'+
            '</div>'+
        '</div>',
    replace:true
  }
}).directive('confirm',function(){
  return {
    scope:{
      cancel:"&",
      sure:"&",
      title:"@",
      txt:"@"
    },
    restrict:'E',
    template:'<div class="js_dialog" >'+
        '<div class="weui-mask"></div>'+
        '<div class="weui-dialog">'+
          '<div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>'+
          '<div class="weui-dialog__bd">{{txt}}</div>'+
          '<div class="weui-dialog__ft">'+
            '<a ng-click="cancel();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>'+
            '<a ng-click="sure();" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>'+
          '</div>'+
        '</div>'+
      '</div>',
    replace:true
  }
}).directive('loading',function(){
  return {
    restrict:'E',
    template:'<div id="loadingToast">'+
        '<div class="weui-mask_transparent"></div>'+
        '<div class="weui-toast">'+
            '<i class="weui-loading weui-icon_toast"></i>'+
        '</div>'+
    '</div>',
    replace:true
  };
}).directive('tip',function(){
  return {
    scope:{
      txt:"@"
    },
    restrict:'E',
    template:'<div id="toast">'+
        '<div class="weui-mask_transparent"></div>'+
        '<div class="weui-toast_tip">{{txt}}</div>'+
    '</div>',
    replace:true
  };
})
.directive('body', function($window) {
    return {
        restrict: 'E',
        link: function(scope, $element) {
            var s = app.getScreenSize();
            if (s == 'sm' || s == 'xs') {
                E.nav_collapsed();
            }
            angular.element($window).bind('resize', function() {
                var s = app.getScreenSize();
                if (s == 'sm' || s == 'xs') {
                    E.nav_collapsed();
                }
            });
            angular.element('a').bind('click', function(e) {
                e.preventDefault();
            })
        }
    }
}).directive('navigation', function($rootScope,$window) {
    return {
        restrict: "EA",
        link: function(scope, $el) {
            $rootScope.$on('$stateChangeSuccess', function(){
                E.nav_static();
                var s = app.getScreenSize();
                if (s == 'sm' || s == 'xs') {
                    E.nav_collapsed();
                }
                window.scrollTo(0, 0);
            });
            $el.on('mouseenter', function() {
                E.nav_static();
            });
            function initSidebarScroll() {
                var $sidebarContent = $el.find('.js-sidebar-content');
                if ($el.find('.slimScrollDiv').length != 0) {
                    $sidebarContent.slimscroll({
                        destroy: true
                    })
                }
                $sidebarContent.slimscroll({
                    height: window.innerHeight,
                    size: '4px'
                });
            }
            angular.element($window).bind('resize', initSidebarScroll);
            initSidebarScroll();
        }
    }
})
.directive('dropdowntoggle',function ($rootScope,$window) {
    return {
        restrict: "EA",
        link: function(scope, $el) {
            $el.on('click',function (e) {
                if($el.hasClass('open')){
                    $('.dropdown').removeClass('open');
                }else {
                    $('.dropdown').removeClass('open');
                    $el.addClass('open');
                }
            });
        }
    }
}).directive('stop_propagation',function () {
    return {
        restrict: "A",
        link: function(scope, $el) {
            console.log($el);
            $el.on('click',function (e) {
                console.log(e)
                e.stopPropagation();
            });
        }
    }
}).directive('liveTile', ['scriptLoader', function(scriptLoader){
    return {
        restrict: 'C',
        link: function (scope, $el, attrs){
            function render(){
                $el.css('height', attrs.height).liveTile();
                // remove onResize timeouts if present
                scope.$on('$stateChangeStart', function(){
                    $el.liveTile("destroy", true);
                });
            }
            scriptLoader.loadScripts(['libs/MetroJS/release/MetroJs.Full/MetroJs.js']).then(render);
        }
    }
}])
.directive('bootstrapCalendar', ['scriptLoader',function(scriptLoader){
    return {
        restrict: 'A',
        link: function(scope, $el, attrs){
            function render(){
                var monthNames = ["一月", "二月", "三月", "四月", "五月", "六月",  "七月", "八月", "九月", "十月", "十一月", "十二月"];
                var dayNames = ["日", "一", "二", "三", "四", "五", "六"];
                var events = scope.$eval(attrs.events);
                var $calendar = $el;
                $calendar.calendar({
                    months: monthNames,
                    days: dayNames,
                    events: events,
                    popover_options:{
                        placement: 'top',
                        html: true
                    }
                });
                $calendar.find('.icon-arrow-left').addClass('fa fa-arrow-left');
                $calendar.find('.icon-arrow-right').addClass('fa fa-arrow-right');
                function restyleCalendar(){
                    $calendar.find('.event').each(function(){
                        var $this = $(this),
                            $eventIndicator = $('<span></span>');
                        $eventIndicator.css('background-color', $this.css('background-color')).appendTo($this.find('a'));
                        $this.css('background-color', '');
                    })
                }
                $calendar.find('.icon-arrow-left, .icon-arrow-right').parent().on('click', restyleCalendar);
                restyleCalendar();
            }
            scriptLoader.loadScripts([
                'libs/bootstrap_calendar/bootstrap_calendar/js/bootstrap_calendar.min.js'
            ])
            .then(function(){
                attrs.$observe('events', function(){
                    render();
                });
            });
        }
    }
}]);


'use strict';
var CONFIG={
    DATA:"/Manage/",
    IMG:"/Public/Uploads/",
    TPL:"/admin/",
    RES:"",
};
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.pagination',
    'ui.sortable',
    'ui.uploader',
    'chart.js',
    'ui.bootstrap',
    'oc.lazyLoad',
    'toastr',
    'app.controllers',
    'app.services',
    'app.directives',
    'app.filters',
    'ng.ueditor'
],function($httpProvider) {
      $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
      var param = function(obj) {
        var query = '',
          name, value, fullSubName, subName, subValue, innerObj, i;
        for (name in obj) {
          value = obj[name];
          if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
              subValue = value[i];
              fullSubName = name + '[' + i + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value instanceof Object) {
            for (subName in value) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          } else if (value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        return query.length ? query.substr(0, query.length - 1) : query;
      };
      $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
      }];
    });
app
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/access/signin')
        $stateProvider
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: CONFIG.TPL+'tpl/access/signin.html',
                controller: 'signin'
            })
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: CONFIG.TPL+"tpl/app.html"
            })
            .state('app.signout', {
                url: '/signout',
                templateUrl: CONFIG.TPL+'tpl/access/signin.html',
                controller: 'signout'
            })
           .state('app.home', {
                url: '/home',
                templateUrl: CONFIG.TPL+'tpl/home/index.html',
                controller: "home",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/home/index.js');
                    }]
                }
            })
           .state('app.me', {
                url: '/me',
                templateUrl: CONFIG.TPL + 'tpl/home/me.html',
                controller: "me"
            })
           .state('app.product', {
                url: '/product',
                templateUrl: CONFIG.TPL+'tpl/product/index.html',
                controller: "product",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/product/index.js');
                    }]
                }
            })
           .state('app.product_list', {
                url: '/product_list/:id',
                templateUrl: CONFIG.TPL+'tpl/product/product_list.html',
                controller: "product_list",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/product/index.js');
                    }]
                }
            })
           .state('app.product_detail', {
                url: '/product_detail/:id',
                templateUrl: CONFIG.TPL+'tpl/product/detail.html',
                controller: "product_detail",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/product/index.js');
                    }]
                }
            })
           .state('app.product_category', {
                url: '/product_category',
                templateUrl: CONFIG.TPL+'tpl/product/category.html',
                controller: "product_category",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/product/index.js');
                    }]
                }
            })
           .state('app.today_order', {
                url: '/today_order',
                templateUrl: CONFIG.TPL+'tpl/order/today.html',
                controller: "today_order",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/order/index.js');
                    }]
                }
            })
            .state('app.order', {
                url: '/order',
                templateUrl: CONFIG.TPL+'tpl/order/index.html',
                controller: "order",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/order/index.js');
                    }]
                }
            })
            .state('app.order_detail', {
                url: '/order_detail/:id',
                templateUrl: CONFIG.TPL+'tpl/order/detail.html',
                controller: "order_detail",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/order/index.js');
                    }]
                }
            })
            .state('app.member', {
                url: '/member',
                templateUrl: CONFIG.TPL+'tpl/member/index.html',
                controller: "member",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/member/index.js');
                    }]
                }
            })
            .state('app.member_detail', {
                url: '/member_detail/:id',
                templateUrl: CONFIG.TPL+'tpl/member/detail.html',
                controller: "member_detail",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/member/index.js');
                    }]
                }
            })
            .state('app.member_order', {
                url: '/member_order/:id',
                templateUrl: CONFIG.TPL+'tpl/member/order.html',
                controller: "member_order",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/member/index.js');
                    }]
                }
            })
            .state('app.business', {
                url: '/business',
                templateUrl: CONFIG.TPL+'tpl/business/index.html',
                controller: "business",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/business/index.js');
                    }]
                }
            })
            .state('app.business_detail', {
                url: '/business_detail/:id',
                templateUrl: CONFIG.TPL+'tpl/business/detail.html',
                controller: "business_detail",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/business/index.js');
                    }]
                }
            })
            .state('app.business_member', {
                url: '/business_member/:id',
                templateUrl: CONFIG.TPL+'tpl/business/member.html',
                controller: "business_member",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/business/index.js');
                    }]
                }
            })
            .state('app.business_member_order', {
                url: '/business_member_order/:id',
                templateUrl: CONFIG.TPL+'tpl/business/order.html',
                controller: "business_member_order",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/business/index.js');
                    }]
                }
            })
            .state('app.report_fans', {
                url: '/report_fans',
                templateUrl: CONFIG.TPL+'tpl/report/fans.html',
                controller: "fans",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/report/index.js');
                    }]
                }
            })
            .state('app.report_order', {
                url: '/report_order',
                templateUrl: CONFIG.TPL+'tpl/report/order.html',
                controller: "order_report",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/report/index.js');
                    }]
                }
            })
            .state('app.report_product', {
                url: '/report_product',
                templateUrl: CONFIG.TPL+'tpl/report/product.html',
                controller: "product_report",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/report/index.js');
                    }]
                }
            })
            .state('app.banner', {
                url: '/banner',
                templateUrl: CONFIG.TPL+'tpl/banner/index.html',
                controller: "banner",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/banner/index.js');
                    }]
                }
            })
            .state('app.banner_detail', {
                url: '/banner_detail/:id',
                templateUrl: CONFIG.TPL+'tpl/banner/detail.html',
                controller: "banner_detail",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/banner/index.js');
                    }]
                }
            })
            .state('app.manage', {
                url: '/manage',
                templateUrl: CONFIG.TPL+'tpl/manage/index.html',
                controller: "manage",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/manage/index.js');
                    }]
                }
            })
            .state('app.manage_detail', {
                url: '/manage_detail/:id',
                templateUrl: CONFIG.TPL+'tpl/manage/detail.html',
                controller: "manage_detail",
                resolve:{
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(CONFIG.RES+'res/js/controllers/manage/index.js');
                    }]
                }
            })
            ;
    });
var app = {
        settings:{
            colors:{"white":"#fff","black":"#000","gray-light":"#999","gray-lighter":"#eee","gray":"#666","gray-dark":"#343434","gray-darker":"#222","gray-semi-light":"#777","gray-semi-lighter":"#ddd","brand-primary":"#5d8fc2","brand-success":"#64bd63","brand-warning":"#f0b518","brand-danger":"#dd5826","brand-info":"#5dc4bf"}
        },
        debug: true,
        screens: {
            'xs-max': 767,
            'sm-min': 768,
            'sm-max': 991,
            'md-min': 992,
            'md-max': 1199,
            'lg-min': 1200
        },
        getScreenSize: function() {
            var screenPx = window.innerWidth;
            if (screenPx <= app.screens['xs-max']) return 'xs';
            if ((screenPx >= app.screens['sm-min']) && (screenPx <= app.screens['sm-max'])) return 'sm';
            if ((screenPx >= app.screens['md-min']) && (screenPx <= app.screens['md-max'])) return 'md';
            if (screenPx >= app.screens['lg-min']) return 'lg';
        }
    },
    E = {
        toggle_navigation_state: function(argument) {
            if ($('body').hasClass('nav-collapsed')) {
                this.nav_static();
            } else {
                this.nav_collapsed();
            }
        },
        nav_collapsed: function(argument) {
            $('.hascollapsed').addClass('collapsed');
            $('ul.collapse').removeClass('in');
            $('body').addClass('nav-collapsed').removeClass('nav-static');
        },
        nav_static: function(argument) {
            $('body').removeClass('nav-collapsed').addClass('nav-static');
        }
    };

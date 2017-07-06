var DOMAIN = 'http://www.weizihui.cn/',
  CONFIG = {
    CLIENT: 3,
    VERSION: "1.1.0",
    V: "1",
    URL: DOMAIN,
    WEB: DOMAIN+'app/index.html',
    TPL: "/app/tpls/",
    IMG: DOMAIN + "Public/Uploads/",
    DATA: DOMAIN + "market/"
  },
  M = {
    open: function(url) {
      if (CONFIG.CLIENT == 3) {
        window.open(encodeURI(url), '_blank', 'location=yes');
      } else {
        cordova.InAppBrowser.open(encodeURI(url), '_system', 'location=yes');
      }
    },
    util: {
      hasClass: function(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
      },
      addClass: function(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
      },
      removeClass: function(obj, cls) {
        if (this.hasClass(obj, cls)) {
          var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
          obj.className = obj.className.replace(reg, ' ');
        }
      },
      toggleClass: function(obj, cls) {
        if (this.hasClass(obj, cls)) {
          this.removeClass(obj, cls);
        } else {
          this.addClass(obj, cls);
        }
      }
    }
  };
var r = angular.module('app', ['ngRoute', 'ngSanitize', 'ngTouch', 'ngAnimate', 'controllers', 'services', 'directives', 'filters'], function($httpProvider) {
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
r.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/index', {
    templateUrl: CONFIG.TPL + 'index.html',
    controller: "index"
  }).when('/detail/:id', {
    templateUrl: CONFIG.TPL + 'detail.html',
    controller: 'detail'
  }).when('/car', {
    templateUrl: CONFIG.TPL + 'car.html',
    controller: 'car'
  }).when('/home', {
    templateUrl: CONFIG.TPL + 'home.html',
    controller: 'home'
  }).when('/home/:t', {
    templateUrl: CONFIG.TPL + 'home.html',
    controller: 'home'
  }).when('/home/:t/:p', {
    templateUrl: CONFIG.TPL + 'home.html',
    controller: 'home'
  }).when('/home/:p', {
    templateUrl: CONFIG.TPL + 'home.html',
    controller: 'home'
  }).when('/order_detail/:id', {
    templateUrl: CONFIG.TPL + 'order_detail.html',
    controller: 'order_detail'
  }).when('/order_detail/:id/:t/:p', {
    templateUrl: CONFIG.TPL + 'order_detail.html',
    controller: 'order_detail'
  }).when('/service', {
    templateUrl: CONFIG.TPL + 'service.html?v=20170706',
    controller: 'service'
  }).otherwise({
    redirectTo: '/index'
  });
}]);
var touch = {
  tX : [],
  touchStart : function(a) {
    this.tX.push(a.touches[0].pageX);
  },
  touchMove : function(c) {
    this.tX.push(c.touches[0].pageX);
    //c.preventDefault();
  },
  touchEnd : function() {
    if (this.tX[0] - this.tX[this.tX.length - 1] > 20) {
      scroll.right();
    }else if ( this.tX[this.tX.length - 1] - this.tX[0] > 20){
      scroll.left();
    }
    this.tX = [];
  }
},scroll={
  i:0,
  n:1,
  lock:false,
  left:function(){
    if(this.lock){return false;}
    this.lock=true;
    if(this.i>0){
      this.i--;
    }
    var d=$('#slide li').eq(-1).clone();
    $('#slide').prepend(d).css({'margin-left':'-100%'});
    $('#slide').animate({'margin-left':'0'},1000,function(){
      $('#slide li').eq(-1).remove();
      $("#slideBar i").removeClass('cur');
      $("#slideBar i").eq(scroll.i).addClass('cur');
      scroll.lock=false;
    });
  },
  right:function(){
    if(this.lock){return false;}
    this.lock=true;
    if(this.i<this.n-1){
      this.i++;
    }else{
      this.i=0;
    }
    var d=$('#slide li').eq(0).clone();
    $('#slide li').eq(0).animate({'margin-left':'-100%'},1000,function(){
      $('#slide li').eq(0).remove();
      $('#slide').append(d);
      $("#slideBar i").removeClass('cur');
      $("#slideBar i").eq(scroll.i).addClass('cur');
      scroll.lock=false;
    });
    clearTimeout(scroll.t);
    scroll.t=setTimeout('scroll.right()',7000);
  }
}
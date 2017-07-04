var directives = angular.module('directives', []);
directives.directive('mydialog', function() {
  return {
    scope: {
      cancel: "&",
      sure: "&",
      title: "@",
      txt: "@",
      suretxt: "@",
      cancaltxt: "@"
    },
    restrict: 'E',
    template: '<div class="dialog"><h1>{{title}}</h1><h2 ng-bind-html="txt"></h2><div><a ng-click="cancel()">{{cancaltxt}}</a><a ng-click="sure()">{{suretxt}}</a></div></div>',
    replace: true
  }
}).directive('headurl', function() {
  return {
    scope: {
      realname: "@",
      headurl: "@"
    },
    restrict: 'EC',

    template: function(elem, attr) {
      var h = '';
      // console.log(attr)
      if (attr.headurl != '') {
        h = '<img src="' + CONFIG.IMG + attr.headurl + '" />';
      } else {
        if (attr.realname) {
          h = '<span class="headurl">' + attr.realname.slice(0, 1) + '</span>';
        } else {
          h = '<span class="headurl"></span>';
        }
      }
      return h;
    },
    scope: true,
    replace: true
  }
}).directive('textinput', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    template: function(elem, attr) {
      return '<span><input type="text" maxlength="20" class="' + attr.dclass + '" placeholder="' + attr.dplaceholder + '" ng-model="' + attr.model + '"/><i class="icon ion-ios-close-empty"></i></span>';
    },
    link: function(scope, element, attr) {
      element.find('input').bind('keyup', function() {
        if (element.find('input').val()) {
          element.find('i').addClass('show');
        } else {
          element.find('i').removeClass('show');
        }
        scope.$apply(attr.ck);
      });
      element.find('i').bind('click', function() {
        scope.$apply(attr.clear);
        scope.$apply(attr.ck);
        element.find('i').removeClass('show');
      });
    }
  };
}).directive('mobileinput', function() {
  return {
    restrict: 'E',
    replace: true,
    template: function(elem, attr) {
      return '<span><input type="tel" maxlength="11" class="' + attr.dclass + '" placeholder="' + attr.dplaceholder + '" ng-model="' + attr.model + '"/><i class="icon ion-ios-close-empty"></i></span>';
    },
    link: function(scope, element, attr) {
      element.find('input').bind('keyup', function() {
        if (element.find('input').val()) {
          element.find('i').addClass('show');
        } else {
          element.find('i').removeClass('show');
        }
        scope.$apply(attr.ck);
      });
      element.find('i').bind('click', function() {
        scope.$apply(attr.clear);
        scope.$apply(attr.ck);
        element.find('i').removeClass('show');
      });
    }
  };
}).directive('numberinput', function() {
  return {
    restrict: 'E',
    replace: true,
    template: function(elem, attr) {
      return '<span><input type="tel" maxlength="' + attr.dlen + '" class="' + attr.dclass + '" placeholder="' + attr.dplaceholder + '" ng-model="' + attr.model + '"/><i class="icon ion-ios-close-empty"></i></span>';
    },
    link: function(scope, element, attr) {
      element.find('input').bind('keyup', function() {
        if (element.find('input').val()) {
          element.find('i').addClass('show');
        } else {
          element.find('i').removeClass('show');
        }
        scope.$apply(attr.ck);
      });
      element.find('i').bind('click', function() {
        scope.$apply(attr.clear);
        scope.$apply(attr.ck);
        element.find('i').removeClass('show');
      });
    }
  };
}).directive('intinput', function() {
  return {
    restrict: 'E',
    replace: true,
    template: function(elem, attr) {
      return '<span><input type="tel" pattern="[0-9]*" maxlength="' + attr.dlen + '" class="' + attr.dclass + '" placeholder="' + attr.dplaceholder + '" ng-model="' + attr.model + '"/><i class="icon ion-ios-close-empty"></i></span>';
    },
    link: function(scope, element, attr) {
      element.find('input').bind('keyup', function() {
        if (element.find('input').val()) {
          element.find('i').addClass('show');
        } else {
          element.find('i').removeClass('show');
        }
        scope.$apply(attr.ck);
      });
      element.find('i').bind('click', function() {
        scope.$apply(attr.clear);
        scope.$apply(attr.ck);
        element.find('i').removeClass('show');
      });
    }
  };
}).directive('passwordinput', function() {
  return {
    restrict: 'E',
    replace: true,
    template: function(elem, attr) {
      return '<span><input type="password" maxlength="20" class="' + attr.dclass + '" placeholder="' + attr.dplaceholder + '" ng-model="' + attr.model + '"/><i class="icon ion-ios-close-empty"></i></span>';
    },
    link: function(scope, element, attr) {
      element.find('input').bind('keyup', function() {
        if (element.find('input').val()) {
          element.find('i').addClass('show');
        } else {
          element.find('i').removeClass('show');
        }
        scope.$apply(attr.ck);
      });
      element.find('i').bind('click', function() {
        scope.$apply(attr.clear);
        scope.$apply(attr.ck);
        element.find('i').removeClass('show');
      });
    }
  };
}).directive('alert', function() {
  return {
    scope: {
      sure: "&",
      txt: "@"
    },
    restrict: 'E',
    template: '<div class="js_dialog">' +
      '<div class="weui-mask"></div>' +
      '<div class="weui-dialog">' +
      '<div class="weui-dialog__bd">{{txt}}</div>' +
      '<div class="weui-dialog__ft">' +
      '<a ng-click="sure();" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>' +
      '</div>' +
      '</div>' +
      '</div>',
    replace: true
  }
}).directive('confirm', function() {
  return {
    scope: {
      cancel: "&",
      sure: "&",
      title: "@",
      txt: "@"
    },
    restrict: 'E',
    template: '<div class="js_dialog" >' +
      '<div class="weui-mask"></div>' +
      '<div class="weui-dialog">' +
      '<div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>' +
      '<div class="weui-dialog__bd">{{txt}}</div>' +
      '<div class="weui-dialog__ft">' +
      '<a ng-click="cancel();" class="weui-dialog__btn weui-dialog__btn_default">取消</a>' +
      '<a ng-click="sure();" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>' +
      '</div>' +
      '</div>' +
      '</div>',
    replace: true
  }
}).directive('loading', function() {
  return {
    restrict: 'E',
    template: '<div id="loadingToast">' +
      '<div class="weui-mask_transparent"></div>' +
      '<div class="weui-toast">' +
      '<i class="weui-loading weui-icon_toast"></i>' +
      '</div>' +
      '</div>',
    replace: true
  };
}).directive('tip', function() {
  return {
    restrict: 'E',
    scope: {
      txt: "@"
    },
    template: '<div id="toast">' +
      '<div class="weui-mask_transparent"></div>' +
      '<div class="weui-toast_tip">{{txt}}</div>' +
      '</div>',
    replace: true
  };
}).directive('mynav', function() {
  return {
    restrict: 'E',
    template: '<div class="weui-tabbar">'+
          '<a href="#!/index" class="weui-tabbar__item">'+
            '<span class="img_warp"><i class="iconfont icon-home"></i></span>'+
            '<p class="weui-tabbar__label">首页</p>'+
          '</a>'+
          '<a href="#!/service" class="weui-tabbar__item">'+
            '<span class="img_warp"><i class="iconfont icon-fuwu1"></i></span>'+
            '<p class="weui-tabbar__label">服务指南</p>'+
          '</a>'+
          '<a href="#!/car" class="weui-tabbar__item">'+
            '<span class="img_warp">'+
              '<i class="iconfont icon-27"></i>'+
              '<span ng-show="{{car_count}}" class="weui-badge">{{car_count}}</span>'+
            '</span>'+
            '<p class="weui-tabbar__label">购物车</p>'+
          '</a>'+
          '<a href="#!/home" class="weui-tabbar__item">'+
            '<span class="img_warp"><i class="iconfont icon-orders"></i></span>'+
            '<p class="weui-tabbar__label">我的订单</p>'+
          '</a>'+
        '</div>',
    replace: true
  };
});
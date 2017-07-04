var services = angular.module('services', []);
services.factory('mySocket', function($websocket) {
  var dataStream = $websocket('ws://192.168.1.114:8080/quote?userId=1001');
  var collection = [];
  dataStream.onMessage(function(message) {
    collection.push(JSON.parse(message.data));
  });
  var methods = {
    collection: collection,
    get: function() {
      dataStream.send(JSON.stringify({
        action: 'get'
      }));
    }
  };
  return methods;
}).factory('car', function() {
  return {
    get: function() {
      var d = localStorage.getItem('car');
      if (d) {
        return eval("(" + d + ")");
      } else {
        return [];
      }
    },
    set: function(d) {
      localStorage.setItem('car', JSON.stringify(d));
    }
  }
}).factory("fave", ['$http', function($http) {
  return {
    add: function(i, v) {
      var p = {
        version: V.version,
        requestType: V.requestType,
        stockCode: v,
        exchangeType: i
      };
      var d = this.get();
      d.push({
        stockCode: v,
        exchangeType: i
      });
      this.set(d);
      $http.get(stock.data.stock + 'user/core/addMyOptionalStock', {
        params: p
      }).success(function(d) {
        /*console.log(d);*/
      });
    },
    remove: function(i, v) {
      var p = {
        version: V.version,
        requestType: V.requestType,
        stockCode: v,
        exchangeType: i
      };
      var d = this.get(),
        j = 0;
      for (j; j < d.length; j++) {
        if (d[j].stockCode == v && d[j].exchangeType == i) {
          d.splice(j, 1);
        }
      }
      this.set(d);
      $http.get(stock.data.stock + 'user/core/removeMyOptionalStock', {
        params: p
      }).success(function(d) {
        /*console.log(d);*/
      });
    },
    get: function() {
      var d = localStorage.getItem('local');
      if (d) {
        return eval("(" + d + ")");
      } else {
        return [];
      }
    },
    set: function(d) {
      localStorage.setItem('local', JSON.stringify(d));
    }
  };
}]).factory('myDialog', function() {
  return {
    alert: function(that, x, fn) {
      that.openAlert = true;
      that.alert = {
        txt: x,
        suretxt: '确定',
        sure: function() {
          that.openAlert = false;
          if (fn) {
            fn();
          }
        }
      }
    },
    confirm: function(that, x, fn1, fn2) {
      that.openConfirm = true;
      that.confirm = {
        txt: x,
        suretxt: '确定',
        canceltxt: '取消',
        sure: function() {
          that.openConfirm = false;
          if (fn1) {
            fn1();
          }
        },
        cancel: function() {
          that.openConfirm = false;
          if (fn2) {
            fn2();
          }
        }
      }
    },
    tip: function(that, x,t,fn) {
      that.openTip = true;
      that.tip = {
        txt: x
      }
      t(function() {
        that.openTip = false;
        if(fn){
          fn();
        }
      }, 2000);
    }
  }
}).factory('citys', function() {
  return {
    provinces: ["山东", "河北", "海南", "江西", "四川", "山西", "陕西", "广西", "浙江", "河南", "上海", "新疆", "北京", "江苏", "安徽", "黑龙江", "天津", "湖北", "云南", "湖南", "辽宁", "广东", "福建", "甘肃", "内蒙古", "吉林", "青海", "贵州", "重庆", "宁夏", "西藏"],
    city: {
      "河北": ["张家口市", "廊坊市", "保定市", "唐山市", "沧州市", "石家庄市", "邯郸市", "承德市", "邢台市", "衡水市", "秦皇岛市"],
      "海南": ["海口市", "三亚市"],
      "江西": ["吉安市", "上饶市", "宜春市", "九江市", "南昌市", "赣州市", "抚州市", "萍乡市", "景德镇市", "鹰谭市", "新余市"],
      "四川": ["达州市", "绵阳市", "乐山市", "德阳市", "成都市", "内江市", "宜宾市", "眉山市", "阿坝州", "南充市", "凉山州", "广元市", "雅安市", "泸州市", "甘孜州", "广安市", "巴中市", "资阳市", "遂宁市", "攀枝花市", "自贡市"],
      "山西": ["运城市", "晋中市", "太原市", "忻州市", "长治市", "吕梁市", "大同市", "晋城市", "阳泉市", "临汾市", "朔州市"],
      "陕西": ["咸阳市", "宝鸡市", "榆林市", "渭南市", "西安市", "商洛市", "汉中市", "延安市", "安康市", "铜川市"],
      "广西": ["柳州市", "防城港市", "南宁市", "桂林市", "河池市", "钦州市", "玉林市", "北海市", "来宾市", "梧州市", "贺州市", "百色市", "贵港市", "崇左市"],
      "浙江": ["台州市", "宁波市", "温州市", "丽水市", "金华市", "嘉兴市", "杭州市", "湖州市", "绍兴市", "舟山市", "衢州市"],
      "河南": ["三门峡市", "安阳市", "开封市", "新乡市", "洛阳市", "许昌市", "郑州市", "驻马店市", "南阳市", "平顶山市", "焦作市", "漯河市", "商丘市", "周口市", "鹤壁市", "濮阳市", "信阳市"],
      "上海": ["上海市"],
      "新疆": ["乌鲁木齐市", "喀什地区", "昌吉回族自治州", "阿克苏地区", "巴音郭楞蒙古自治州", "伊犁哈萨克自治州", "克孜勒苏柯尔克孜自治州", "石河子市", "塔城地区", "和田地区", "哈密地区", "克拉玛依市", "博尔塔拉蒙古自治州", "阿勒泰地区", "吐鲁番地区"],
      "北京": ["北京市"],
      "江苏": ["南京市", "南通市", "无锡市", "苏州市", "镇江市", "宿迁市", "常州市", "徐州市", "扬州市", "泰州市", "淮安市", "盐城市", "连云港市"],
      "安徽": ["合肥市", "淮南市", "安庆市", "马鞍山市", "芜湖市", "蚌埠市", "铜陵市", "滁州市", "池州市", "阜阳市", "亳州市", "黄山市", "六安市", "巢湖市", "宣城市", "宿州市", "淮北市"],
      "黑龙江": ["哈尔滨市", "大庆市", "七台河市", "伊春市", "佳木斯市", "大兴安岭地区", "双鸭山市", "牡丹江市", "黑河市", "鹤岗市", "绥化市", "鸡西市", "齐齐哈尔市"],
      "天津": ["天津市"],
      "湖北": ["宜昌市", "武汉市", "荆州市", "襄樊市", "鄂州市", "黄石市", "黄冈市", "十堰市", "孝感市", "荆门市", "恩施州", "咸宁市", "随州市"],
      "云南": ["昆明市", "曲靖市", "玉溪市", "临沧市", "保山市", "丽江市", "思茅市", "昭通市"],
      "湖南": ["株州市", "湘潭市", "郴州市", "长沙市", "永州市", "衡阳市", "吉首市", "娄底市", "益阳市", "岳阳市", "常德市", "张家界市", "邵阳市", "怀化市"],
      "辽宁": ["沈阳市", "丹东市", "大连市", "本溪市", "营口市", "葫芦岛市", "辽阳市", "鞍山市", "抚顺市", "锦州市", "盘锦市", "铁岭市", "阜新市", "朝阳市"],
      "广东": ["深圳市", "东莞市", "佛山市", "广州市", "中山市", "惠州市", "珠海市", "江门市", "湛江市", "肇庆市", "河源市", "汕头市", "梅州市", "云浮市", "清远市", "茂名市", "揭阳市", "汕尾市", "韶关市", "潮州市", "阳江市"],
      "福建": ["福州市", "厦门市", "泉州市", "漳州市", "龙岩市", "莆田市", "三明市", "南平市", "宁德市"],
      "山东": ["东营市", "临沂市", "威海市", "济南市", "济宁市", "淄博市", "潍坊市", "烟台市", "聊城市", "青岛市", "菏泽市", "泰安市", "德州市", "日照市", "滨州市", "枣庄市", "莱芜市"],
      "甘肃": ["兰州市", "陇南市", "平凉市", "定西市", "庆阳市", "临夏州", "张掖市", "甘南州", "白银市", "武威市", "嘉峪关市", "天水市", "酒泉市", "金昌市"],
      "内蒙古": ["包头市", "呼伦贝尔市", "呼和浩特市", "鄂尔多斯市", "锡林郭勒盟", "乌兰察布市", "兴安盟", "巴彦淖尔市", "乌海市", "赤峰市", "通辽市", "阿拉善盟"],
      "吉林": ["吉林市", "长春市", "辽源市", "白城市", "白山市", "通化市", "四平市", "松原市", "延边州"],
      "青海": ["西宁市", "海东地区", "果洛藏族自治州", "海北藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州", "海南藏族自治州", "黄南藏族自治州"],
      "贵州": ["贵阳市", "遵义市", "六盘水市", "安顺市"],
      "重庆": ["重庆市", "涪陵市", "万州市", "黔江市"],
      "宁夏": ["吴忠市", "银川市", "中卫市", "固原市", "石嘴山市"],
      "西藏": ["拉萨市"]
    }
  }
}).factory('saveuser', ['$http', '$interval', '$location', function($http, $interval, $location) {
  return {
    save: function($scope, myDialog) {
      var image = document.getElementById('imgurl2').value,
        req = {
          version: CONFIG.V,
          client: CONFIG.CLIENT,
          t: $scope.v.t,
          realname: $scope.v.realname,
          sex: $scope.v.sex,
          mobile: $scope.v.mobile,
          verify: $scope.v.verify,
          identity: $scope.v.identity,
          province: $scope.v.province,
          city: $scope.v.city,
          country: $scope.v.country,
          town: $scope.v.town,
          address: $scope.v.address,
          number: $scope.v.number,
          agrotype: $scope.v.agrotype,
          raise_crops: $scope.v.raise_crops,
          fertilization: $scope.v.fertilization,
          fertilizer_brand: $scope.v.fertilizer_brand,
          age: $scope.v.age,
          image: image
        };
      if (req.t != 1) {
        req.id = $scope.v.id;
      }
      if (!req.realname) {
        return myDialog.alert($scope, '姓名不能为空');
      } else if (!req.mobile) {
        return myDialog.alert($scope, '手机号不能为空');
      } else if (!req.address) {
        return myDialog.alert($scope, '地址信息不能为空');
      }

      function isID(e) {
        var errors = [0, '身份证号码位数不对!', '身份证号码出生日期超出范围或含有非法字符!', '身份证号码校验错误!', '身份证地区非法!'],
          area = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
          },
          idcard = e,
          Y, JYM, S, M, idcard_array = idcard.split('');
        if (!area[parseInt(idcard.substr(0, 2))]) {
          return errors[4];
        }
        switch (idcard.length) {
          case 15:
            var ereg;
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
            } else {
              ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
            }
            if (ereg.test(idcard)) {
              return errors[0];
            } else {
              return errors[2];
            }
            break;
          case 18:
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
              ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
            } else {
              ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
            }
            if (ereg.test(idcard)) {
              S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
              Y = S % 11;
              M = "F";
              JYM = "10X98765432";
              M = JYM.substr(Y, 1);
              if (M == idcard_array[17]) {
                return errors[0];
              } else {
                return errors[3];
              }
            } else {
              return errors[2];
            }
            break;
          default:
            return errors[1];
        }
      }
      if (req.identity) {
        //判断身份证
        if (isID(req.identity)) {
          return myDialog.alert($scope, '身份证信息非法');
        }
      }
      $scope.loading = true;
      $http.post(CONFIG.DATA + 'emplyeedata/usersave', req).success(function(r) {
        $scope.loading = false;
        if (r.flag == 1) {
          // myDialog.alert($scope,r.msg);
          $location.path('/staff/userdetail/' + r.uid);
        } else {
          myDialog.alert($scope, r.msg);
        }
      });
    },
    getVerify: function($scope, myDialog) {
      if ($scope.lock || $scope.sending) {
        return false;
      }

      function isPhone(i) {
        var r = /^\+?[1-9][0-9]*$/;
        return (!r.test(i) || i.length != 11) ? false : true;
      }

      function updateTime() {
        $scope.count--;
      }
      if (!isPhone($scope.v.mobile)) {
        return myDialog.alert($scope, '请输入正确的手机号');
      }
      $scope.lock = true;
      $scope.sending = true;
      var timer, req = {
        version: CONFIG.V,
        client: CONFIG.CLIENT,
        mobile: $scope.v.mobile,
        t: 1
      };
      $http.get(CONFIG.DATA + 'emplyeedata/sendmsg', {
        params: req
      }).success(function(r) {
        $scope.lock = false;
        if (r.flag == 1) {

        } else {
          $scope.lock = false;
          $scope.sending = false;
          $interval.cancel(timer);
          $scope.count = 60;
        }
        myDialog.alert($scope, r.msg);
      }).error(function(d) {
        $scope.lock = false;
        $scope.sending = false;
      });
      $interval.cancel(timer);
      timer = $interval(function() {
        if ($scope.count == 1) {
          $interval.cancel(timer);
          $scope.count = 60;
          $scope.sending = false;
        } else {
          updateTime();
        }
      }, 1000, 60);
    }
  };
}]).factory('loadmap', ['$http', function($http) {
  return {
    province: function($scope) {
      this.select(0, $scope, 'provinces');
    },
    city: function($scope) {
      if ($scope.v.province) {
        this.select($scope.v.province, $scope, 'citys');
      }
    },
    country: function($scope) {
      if ($scope.v.city) {
        this.select($scope.v.city, $scope, 'countrys');
      }
    },
    town: function($scope) {
      if ($scope.v.country) {
        this.select($scope.v.country, $scope, 'towns');
      }
    },
    select: function(pid, $scope, scope) {
      var req = {};
      var req = {
        version: CONFIG.V,
        client: CONFIG.CLIENT,
        pid: pid
      };
      $scope.loading = true;
      $http.get(CONFIG.DATA + 'emplyeedata/map', {
          params: req
        })
        .success(function(r) {
          $scope.loading = false;
          if (r) {
            var i = 0,
              len = r.length;
            r.unshift({
              id: '',
              name: '请选择'
            });
            $scope[scope] = r;
          }
        });
    }
  };
}])
.factory('myAddress',['$http',function($http){
  return {
    get:function(){
      var req={t:new Date().getTime()};
      $http.get(CONFIG.DATA + 'index/address', {params:req}).then(function(r) {
        if(r.flag && r.result){
          v=r.result.split('$');
        }else{
          v=[];
        }
        return v;
      });
    },
    set:function(){

    }
  };
}])

;
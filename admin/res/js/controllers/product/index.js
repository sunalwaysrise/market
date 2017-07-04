'use strict';
angular.module('app.controllers', []).controller('product', function($scope, $http, toastr) {
  Pace.restart();
  $http.get(CONFIG.DATA + 'product/category').then(function(r) {
    r = r.data;
    if (r.flag == 1) {
      $scope.items = r.result;
    } else {
      toastr.error(r.msg);
    }
  }, function() {});

}).controller('product_list', function($scope, $http, $stateParams, toastr, myDialog) {
  Pace.restart();
  var id = $stateParams.id,
    req = {
      id: id
    };
  $scope.__PUBLIC__ = CONFIG.IMG;
  $http.get(CONFIG.DATA + 'product/name', {
    params: req
  }).then(function(r) {
    r = r.data;
    if (r.flag == 1) {
      $scope.title = r.result.name;
    } else {
      toastr.error(r.msg);
    }
  }, function() {});

  function load() {
    $http.get(CONFIG.DATA + 'product/index', {
      params: req
    }).then(function(r) {
      r = r.data;
      if (r.flag == 1) {
        $scope.items = r.result;
      } else {
        toastr.error(r.msg);
      }
    }, function() {});
  }

  $scope.save_az = function() {
    $scope.loading = true;
    var i = 0,
      len = $scope.items.length,
      ids = [],
      azs = [],
      req;
    for (i; i < len; i++) {
      ids.push($scope.items[i].pid);
      azs.push(i);
    }
    req = {
      ids: ids.join(','),
      azs: azs.join(',')
    };
    $scope.loading = true;
    $http.post(CONFIG.DATA + 'product/az_product', req).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        toastr.success(r.msg);
      } else {
        toastr.error(r.msg);
      }
    }, function() {
      $scope.loading = false;
    });
  }

  load();
  $scope.delete_product = function(id) {
    myDialog.confirm($scope, '操作提示', '确认删除么', function() {
      $scope.loading = true;
      $http.get(CONFIG.DATA + 'product/delete_detail/id/' + id).then(function(r) {
        $scope.loading = false;
        r = r.data;
        if (r.flag == 1) {
          load();
          toastr.success(r.msg);
        } else {
          toastr.error(r.msg);
        }
      }, function() {
        $scope.loading = false;
      });
    }, function() {
      // console.log('取消');
    });
  }


}).controller('product_detail', function($scope, $http, $stateParams, uiUploader, toastr) {
  Pace.restart();
  var id = $stateParams.id,
    status = ['否', '是'],
    status2 = {
      '否': 0,
      '是': 1
    },
    categorys = [];
  $scope.sku = [];
  $scope.sku_name = [];
  $scope.sku_value = [];
  
  $scope.load_sku = function() {
    $scope.loading = true;
    var params = {
      pid: id
    };
    $http.get(CONFIG.DATA + 'sku/sku', {
      params: params
    }).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        $scope.sku = r.result;
        var array=[]
        angular.forEach($scope.sku,function(v,i){
          array.push(v.items);
        });
        var len = array.length,results = [],indexs = {};
        function specialSort(start) {
            start++;
            if (start > len - 1) {
                return;
            }
            if (!indexs[start]) {
                indexs[start] = 0;
            }
            if (!(array[start] instanceof Array)) {
                array[start] = [array[start]];
            }
            for (indexs[start] = 0; indexs[start] < array[start].length; indexs[start]++) {
                specialSort(start);
                if (start == len - 1) {
                    var temp = [];
                    for (var i = len - 1; i >= 0; i--) {
                        if (!(array[start - i] instanceof Array)) {
                            array[start - i] = [array[start - i]];
                        }
                        temp.push(array[start - i][indexs[start - i]]);
                    }
                    results.push(temp);
                }
            }
        }
        specialSort(-1);
        $scope.price=results;
        var t=[],i=0,len=results.length;
        for(i;i<len;i++){
          t.push({'price':0,'count':0});
        }
        $scope.price_items=t;

        $http.get(CONFIG.DATA + 'sku/stock', {
          params: params
        }).then(function(rs) {
          function check_price(x,a){
            var oa=[],r={"price":0,"count":0},i=0,len=a.length,s=[];
            angular.forEach(x,function(v,i){
              oa.push(v.id);
            });
            oa=oa.join(',');
            for(i;i<len;i++){
              s=[];
              if(a[i]['sku_value_id_1']){s.push(a[i]['sku_value_id_1']);}
              if(a[i]['sku_value_id_2']){s.push(a[i]['sku_value_id_2']);}
              if(a[i]['sku_value_id_3']){s.push(a[i]['sku_value_id_3']);}
              if(a[i]['sku_value_id_4']){s.push(a[i]['sku_value_id_4']);}
              if(a[i]['sku_value_id_5']){s.push(a[i]['sku_value_id_5']);}
              if(a[i]['sku_value_id_6']){s.push(a[i]['sku_value_id_6']);}
              if(a[i]['sku_value_id_7']){s.push(a[i]['sku_value_id_7']);}
              if(s.join(',')==oa){
                r={'price':parseInt(a[i].price),'count':parseInt(a[i].count)};
                break;
              }
            }
            return r;
          }
          var d=rs.data,i=0,len;
          if(d.flag==1){
            d.result;
            angular.forEach(results,function(v,i){
              $scope.price_items[i]=check_price(v,d.result);
            });
          }
        });
      }
    });
  }
  $scope.save2=function(){
     var params={pid:id},sku_name=[],sku_value=[];
     angular.forEach($scope.sku,function(v,i){
      sku_name.push({"name":v.name});
      sku_value.push(v.items);
     });
     params.sku_name=JSON.stringify(sku_name);
     params.sku_value=JSON.stringify(sku_value);
     $scope.loading = true;
     $http.post(CONFIG.DATA + 'sku/sku_save', params).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        toastr.success('操作成功');
        $scope.load_sku();
        $scope.set_step2();
      }else{
        toastr.error('操作失败');
      }
    });
  }
  $scope.save3=function(){
    var params={pid:id},sku=[];
    angular.forEach($scope.price,function(v,i){
      var o={
        "price":$scope.price_items[i].price,
        "count":$scope.price_items[i].count
      };
      angular.forEach(v,function(va,it){
        o['sku_value_id_'+(it+1)]=va.id;
      });
      sku.push(o);
    });
    params.sku=JSON.stringify(sku);
    $scope.loading = true;
    $http.post(CONFIG.DATA + 'sku/stock_save', params).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        toastr.success('操作成功');
        $scope.load_sku();
        $scope.set_step3();
      }else{
        toastr.error('操作失败');
      }
    });
  }
  $scope.save4=function(){
    var params={pid:id};
    $scope.loading = true;
    $http.post(CONFIG.DATA + 'sku/publish', params).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        toastr.success('操作成功');
      }else{
        toastr.error('操作失败');
      }
    });
  }
  $scope.add_sku_name = function() {
    $scope.sku.push({});
  }
  $scope.add_sku_value = function(i) {
    if ($scope.sku[i].items) {
      console.log(typeof($scope.sku[i].items));
      if (typeof($scope.sku[i].items) == "object") {
        $scope.sku[i].items.push({});
      } else {
        $scope.sku[i].items = [{}];
      }
    } else {
      $scope.sku[i].items = [{}];
    }
  }

  function findIndex(i, array) {
    var index = -1;
    angular.forEach(array, function(value, key, obj) {
      if (value.id === id) {
        index = key;
        return index;
      }
    });
    return index;
  }
  $scope.remove_sku_name = function(x) {
    $scope.sku.splice(x, 1);
  }
  $scope.remove_sku_value = function(x, y) {
    var index = findIndex(x, y);
    $scope.sku[x].items.splice(x, 1);
  }

  if (id == 0) {
    $scope.title = '添加产品';
    $scope.disabled = true;
  } else {
    $scope.load_sku();
    $scope.title = '产品详情';
    $scope.disabled = false;
  }
  $http.get(CONFIG.DATA + 'product/category').then(function(r) {
    r = r.data;
    if (r.flag == 1) {
      $scope.loading = false;
      $scope.category = r.result;
      categorys = r.result;
      if (id != 0) {
        var req = {
          id: id
        };
        $scope.loading = true;
        $http.get(CONFIG.DATA + 'product/detail', {
          params: req
        }).then(function(r) {
          $scope.loading = false;
          r = r.data;
          if (r.flag == 1) {
            $scope.d = r.detail;
            // $scope.d.cid="'"+r.detail.cid+"'";
            $scope.images = r.detail.imgs.split(',');
            $scope.categoty_id = r.detail.cid;
            var i = 0;
            for (i; i < categorys.length; i++) {
              if (r.detail.cid == categorys[i].tid) {
                $scope.cid = categorys[i].name;
                $scope.cid_txt = categorys[i].name;
                break;
              }
            }
          } else {
            toastr.error('通讯失败，请重试');
          }
        });
      }
    } else {
      toastr.error(r.msg);
    }
  }, function() {
    $scope.loading = false;
  });

  function set_step() {
    $scope.step0 = false;
    $scope.step1 = false;
    $scope.step2 = false;
    $scope.step3 = false;
  }
  $scope.step0 = true;
  $scope.set_step0 = function() {
    set_step();
    $scope.step0 = true;
  }
  $scope.set_step1 = function() {
    set_step();
    if (!$scope.disabled) {
      $scope.step1 = true;
    }
  }
  $scope.set_step2 = function() {
    set_step();
    if (!$scope.disabled) {
      $scope.step2 = true;
    }
  }
  $scope.set_step3 = function() {
    set_step();
    if (!$scope.disabled) {
      $scope.step3 = true;
    }
  }

  $scope.save = function() {
    var d = $scope.d;
    if (!d.title) {
      return toastr.error('名称不能为空');
    }
    if (!d.cid) {
      return toastr.error('类别不能为空');
    }
    d.status = 0;
    d.imgs = $scope.images.join(',');
    $scope.loading = true;
    $http.post(CONFIG.DATA + 'product/update_detail', d).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        toastr.success(r.msg);
        $scope.set_step1();
      } else {
        toastr.error(r.msg);
      }
    });
  }



  $scope.__PUBLIC__ = CONFIG.IMG;
  $scope.images = [];
  $scope.remove = function(x) {
    var i = 0,
      arr = $scope.images;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == x) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  $scope.btn_remove = function(file) {
    uiUploader.removeFile(file);
  };
  $scope.btn_clean = function() {
    uiUploader.removeAll();
  };
  $scope.btn_upload = function() {
    $scope.loading = true;
    console.log('uploading...');
    uiUploader.startUpload({
      url: CONFIG.DATA + 'product/upload_product_image',
      concurrency: 2,
      onProgress: function(file) {
        console.log(file.name + '=' + file.humanSize);
        $scope.$apply();
      },
      onCompleted: function(file, response) {
        // console.log(file + 'response' + response);
        uiUploader.removeFile(file);
        response = eval("(" + response + ")");
        console.log(response.msg);
        $scope.images.push(response.msg);
        $scope.$apply();
      },
      onCompletedAll: function(files) {
        //全部上传完毕
        document.getElementById('file1').value = "";
        $scope.loading = false;
        $scope.$apply();
      }
    });
  };

  $scope.files = [];
  $scope.changed = function(e) {
    var files = e.target.files;
    uiUploader.addFiles(files);
    $scope.files = uiUploader.getFiles();
    $scope.$apply();
  };



}).controller('product_category', function($scope, $http, $timeout, myDialog, toastr) {
  Pace.restart();
  $scope.add = function() {
    $scope.is_add = true;
    $scope.title = "添加类别";
    $scope.category_name = '';
    $scope.category_status = '是';
    $scope.show_edit_dialog = true;
  }
  $scope.save_az = function() {
    $scope.loading = true;
    var i = 0,
      len = $scope.items.length,
      ids = [],
      azs = [],
      req;
    for (i; i < len; i++) {
      ids.push($scope.items[i].tid);
      azs.push(i);
    }
    req = {
      ids: ids.join(','),
      azs: azs.join(',')
    };
    $scope.loading = true;
    $http.post(CONFIG.DATA + 'product/az_category', req).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        toastr.success(r.msg);
      } else {
        toastr.error(r.msg);
      }
    }, function() {
      $scope.loading = false;
    });
  }
  $scope.edit_category = function(tid, name, status) {
    $scope.is_add = false;
    var a = ['否', '是'];
    $scope.title = "修改类别";
    $scope.category_name = name;
    $scope.category_id = tid;
    $scope.category_status = a[status];
    $scope.show_edit_dialog = true;
  }
  $scope.ok = function() {
    var req,
      status = {
        "是": 1,
        "否": 0
      };
    if ($scope.is_add) {
      req = {
        name: $scope.category_name,
        status: status[$scope.category_status]
      };
    } else {
      req = {
        name: $scope.category_name,
        status: status[$scope.category_status],
        id: $scope.category_id
      };
    }
    if (!req.name) {
      return toastr.error('名称不能为空');
    }
    $scope.loading = true;
    $http.post(CONFIG.DATA + 'product/update_category', req).then(function(r) {
      $scope.loading = false;
      r = r.data;
      if (r.flag == 1) {
        load();
        $scope.show_edit_dialog = false;
        toastr.success(r.msg);
      } else {
        toastr.error(r.msg);
      }
    }, function() {
      $scope.loading = false;
    });
  }

  function load() {
    $scope.loading = true;
    $http.get(CONFIG.DATA + 'product/category').then(function(r) {
      r = r.data;
      $scope.loading = false;
      $scope.items = r.result;
    }, function() {
      $scope.loading = false;
    });
  }
  load();
  $scope.delete_category = function(id) {
    myDialog.confirm($scope, '操作提示', '确认删除么', function() {
      $scope.loading = true;
      $http.get(CONFIG.DATA + 'product/delete_category/id/' + id).then(function(r) {
        $scope.loading = false;
        r = r.data;
        if (r.flag == 1) {
          load();
          toastr.success(r.msg);
        } else {
          toastr.error(r.msg);
        }
      }, function() {
        $scope.loading = false;
      });
    }, function() {
      // console.log('取消');
    });
  }

});
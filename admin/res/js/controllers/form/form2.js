/**
 * Created by wenbin.lu on 2017/3/27.
 */
'use strict';
angular.module('app.controllers', []).controller('form2', function($scope,uiUploader,toastr) {
    Pace.restart();

    $scope.__PUBLIC__=CONFIG.IMG;
    $scope.uploadimg=[];
    $scope.btn_remove = function(file) {
        uiUploader.removeFile(file);
    };
    $scope.btn_clean = function() {
        uiUploader.removeAll();
    };
    $scope.btn_upload = function() {
        uiUploader.startUpload({
            url: CONFIG.DATA+"banner/upload",
            concurrency: 2,
            onProgress: function(file) {
                // console.log(file.name + '=' + file.humanSize);
                $scope.$apply();
            },
            onCompleted: function(file, response) {
                // console.log(file + 'response' + response);
                uiUploader.removeFile(file);
                response=eval("("+response+")");
                $scope.uploadimg.push(response.msg);
                $scope.$apply();
            },
            onCompletedAll: function(files) {
                //全部上传完毕
            }
        });
    };

    $scope.files = [];
    var element = document.getElementById('file1');
    element.addEventListener('change', function(e) {
        var files = e.target.files;
        uiUploader.addFiles(files);
        $scope.files = uiUploader.getFiles();
        $scope.$apply();
    });

    $scope.items=[1,2,3,4,5,6,7];
});
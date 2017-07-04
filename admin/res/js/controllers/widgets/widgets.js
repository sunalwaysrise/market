/**
 * Created by wenbin.lu on 2017/3/27.
 */
'use strict';
angular.module('app.controllers', []).controller('widgets', function($scope, $http, $location, toastr) {
     Pace.restart();
    // 第一部分 内需要 指令 live-tile


    $scope.generateRandomData = function(labels){
        function random() {
            return (Math.floor(Math.random() * 30)) + 10;
        }

        var data = [],
            maxValueIndex = 5;

        for (var i = 0; i < labels.length; i++){
            var randomSeries = [];
            for (var j = 0; j < 25; j++){
                randomSeries.push([j, Math.floor(maxValueIndex * j) + random()])
            }
            maxValueIndex--;
            data.push({
                data: randomSeries, showLabels: true, label: labels[i].label, labelPlacement: "below", canvasRender: true, cColor: "red", color: labels[i].color
            })
        }
        return data;
    };

});


/**
 * Created by Administrator on 2017/3/15.
 */
'use strict';
angular.module('app.controllers', []).controller('charts', function($scope, $http, $location,$timeout,$interval,toastr) {
    Pace.restart();

    $scope.bar_labels=[ '2012','2013','2014','2015','2016','2017'];
    $scope.bar_data=[
        [65, 59, 80, 81, 56, 55],
        [28, 48, 40, 19, 86, 90]
    ];
    $scope.bar_override=[
        {
            label:"A",
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        {
            label:"B",
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor:'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ];


    $scope.line_labels=[ '2012','2013','2014','2015','2016','2017'];
    $scope.line_data=[
        [65, 59, 80, 81, 56, 55],
        [28, 48, 40, 19, 86, 90]
    ];
    $scope.line_options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };
    $scope.line_override=[
        {
            label:"甲",
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            yAxisID: 'y-axis-1'
        },
        {
            label:"乙",
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor:'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            yAxisID: 'y-axis-2'
        }
    ];

    $scope.line_click = function (points, evt) {
        console.log(points, evt);
    };






    $scope.pie_labels = ["北京", "上海","杭州"];
    $scope.pie_data = [300, 500, 100];
    $scope.pie_override={
        backgroundColor: [
            "rgba(255,99,132,.85)",
            "rgba(54,162,235,.85)",
            "rgba(255,206,86,.85)"
        ],
        hoverBackgroundColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(255,206,86,1)"
        ],
        borderWidth:1,
        hoverBorderWidth:2
    };


    $scope.doughnut_labels = ["北京", "上海","杭州"];
    $scope.doughnut_data = [700, 500, 300];
    $scope.doughnut_override={
        backgroundColor: [
            "rgba(255,99,132,.85)",
            "rgba(54,162,235,.85)",
            "rgba(255,206,86,.85)"
        ],
        hoverBackgroundColor: [
            "rgba(255,99,132,1)",
            "rgba(54,162,235,1)",
            "rgba(255,206,86,1)"
        ],
        borderWidth:1,
        hoverBorderWidth:2
    };

    $scope.radar_labels=["非常好","很好","一般", "非常差","很差","差"];
    $scope.radar_data=[
        [65, 59, 90, 81, 56, 55, 40],
        [28, 48, 40, 19, 96, 27, 100]
    ];
    $scope.radar_override=[
        {
            label:"A",
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        {
            label:"B",
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor:'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ];





    $scope.horizontal_labels=[ '2012','2013','2014','2015','2016','2017'];
    $scope.horizontal_data=[
        [65, 59, 80, 81, 56, 55],
        [28, 48, 40, 19, 86, 90]
    ];
    $scope.horizontal_override=[
        {
            label:"A",
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        {
            label:"B",
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor:'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ];




    $scope.bubble_series = [];
    $scope.bubble_options = {
        scales: {
            xAxes: [{
                display: false,
                ticks: {
                    max: 125,
                    min: -125,
                    stepSize: 10
                }
            }],
            yAxes: [{
                display: false,
                ticks: {
                    max: 125,
                    min: -125,
                    stepSize: 10
                }
            }]
        }
    };
    $scope.bubble_data = [];
    for (var i = 0; i < 50; i++) {
        $scope.bubble_data.push([{
            x: randomScalingFactor(),
            y: randomScalingFactor(),
            r: randomRadius()
        }]);
    }

    function randomScalingFactor () {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }
    function randomRadius () {
        return Math.abs(randomScalingFactor()) / 4;
    }




    $scope.mixed_colors = ['#45b7cd', '#ff6384', '#ff8e72'];
    $scope.mixed_labels = ['1/3', '2/3', '3/3', '4/3', '5/3', '6/3', '7/3','8/3','9/3','10/3','11/3'];
    $scope.mixed_data = [
        [65, -59, 80, 81, -56, 55, -40, 81, -56, 55, -40],
        [28, 48, -40, 19, 86, 27, 90, 19, 86, 27, 90]
    ];
    $scope.mixed_override = [
        {
            label: "Bar chart",
            borderWidth: 1,
            type: 'bar'
        },
        {
            label: "Line chart",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            type: 'line'
        }
    ];



});
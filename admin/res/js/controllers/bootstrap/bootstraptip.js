/**
 * Created by Administrator on 2017/3/15.
 */
angular.module('app.controllers', []).controller('bootstraptip', function($scope, $sce) {
    Pace.restart();
    $scope.placement = {
        options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
        ],
        selected: 'top'
    };
    $scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');


    $scope.placement2 = {
        options: [
            'top',
            'top-left',
            'top-right',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'right',
            'right-top',
            'right-bottom'
        ],
        selected: 'top'
    };
    $scope.dynamicTooltipText='hello';
    $scope.htmlTooltip = $sce.trustAsHtml('全部来自model');

});
/**
 * Created by wenbin.lu on 2017/3/28.
 */
angular.module('app.controllers', [])
.controller('table1', function($scope,$resource) {
    Pace.restart();
    var lists = $resource('demo/json/lists.json').query();
    $scope.lists=lists;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
}).controller('table2', function($scope,$resource,$http,$timeout,uiGridConstants) {
    Pace.restart();
    $scope.mySelections='';
    var people = $resource('demo/json/lists.json').query();
    $scope.people=people;
    $scope.gridOptions={
        enableSorting: true,
        data: 'people',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        rowHeight: 35,
        showGridFooter:true,
        enableSelectAll: true
    };
    $scope.gridOptions.columnDefs= [
            { name: 'last_name' ,displayName:'姓', visible: true,cellClass:function (grid, row, col, rowRenderIndex, colRenderIndex) {
                    var c='';
                    if(row.entity.price>300){
                        c='success'
                    }else if(row.entity.price>200){
                        c='info'
                    }
                    return c;
                },
                menuItems:[
                    {
                        title: '自定义操作',
                        icon: 'ui-grid-icon-info-circled',
                        action: function($event) {
                            console.log($event);
                        },
                        shown: function() { return true; },
                        active: function() { return true; },
                        context: $scope
                    },
                    {
                        title: '自定义操作',
                        action: function() {
                            alert('Grid ID: ' + this.grid.id);
                        }
                    }
                ]
            },
            { name: 'first_name',displayName:'名', enableSorting: false,enableCellEdit: false },
            { name: 'description' ,displayName:'描述',enableColumnMenus:true,width:160},
            { name: 'date',displayName:'日期' },
            { name: 'size' ,displayName:'大小'},
            { name: 'email',displayName:'邮箱' ,minWidth:160,maxWidth:300},
            { name: 'info.Type' ,displayName:'类型'},
            { name: 'info.Dimensions' ,displayName:'规格'},
            { name: 'progress_status' ,displayName:'进度'},
            // { name: 'price' ,displayName:'价格',cellTemplate:'<div ng-class="{green: row.getProperty(col.field) > 30}"><div class="ngCellText">{{row.getProperty(col.field)}}</div>'},
            { name: 'price' ,displayName:'价格'},
            { name: 'status' ,displayName:'状态'},
            {name:"删除",cellTemplate: '<a ng-click="grid.appScope.edit(row.entity)" >删除</a>'}
        ];
    $scope.edit = function( entity ) {
        console.log(entity)
    };


    //第二张表格
    $scope.gridOptions1 = {
        enableRowSelection: true,
        enableSelectAll: true,
        selectionRowHeaderWidth: 35,
        enableRowHeaderSelection: true,
        rowHeight: 35,
        showGridFooter:true,
        paginationPageSizes: [10,25,50,100],
        paginationPageSize: 10
    };
    $scope.gridOptions1.multiSelect = true;
    $http.get('demo/json/500_complex.json').then(function(data) {
        $scope.gridOptions1.data = data.data;

        $timeout(function() {
            if($scope.gridApi.selection.selectRow){
                $scope.gridApi.selection.selectRow($scope.gridOptions1.data[0]);
            }
        });
    }).catch(function(data) {
    });

    $scope.info = {};
    $scope.toggleMultiSelect = function() {
        $scope.gridApi.selection.setMultiSelect(!$scope.gridApi.grid.options.multiSelect);
    };
    $scope.toggleModifierKeysToMultiSelect = function() {
        $scope.gridApi.selection.setModifierKeysToMultiSelect(!$scope.gridApi.grid.options.modifierKeysToMultiSelect);
    };
    $scope.selectAll = function() {
        $scope.gridApi.selection.selectAllRows();
    };
    $scope.clearAll = function() {
        $scope.gridApi.selection.clearSelectedRows();
    };
    $scope.toggleRow1 = function() {
        $scope.gridApi.selection.toggleRowSelection($scope.gridOptions1.data[0]);
    };
    $scope.toggleFullRowSelection = function() {
        $scope.gridOptions1.enableFullRowSelection = !$scope.gridOptions1.enableFullRowSelection;
        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
    };
    $scope.setSelectable = function() {
        $scope.gridApi.selection.clearSelectedRows();
        $scope.gridOptions1.isRowSelectable = function(row){
            if(row.entity.age > 30){
                return false;
            } else {
                return true;
            }
        };
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
        $scope.gridOptions1.data[0].age = 31;
        $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.EDIT);
    };
    $scope.gridOptions1.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            var msg = 'row selected ' + row.isSelected;
            console.log(msg);
        });

        gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
            var msg = 'rows changed ' + rows.length;
            console.log(msg);
        });
    };

})

;

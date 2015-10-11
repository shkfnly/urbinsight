'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:PilotCitiesDashboardUmisWorkbookselectionCtrl
 * @description
 * # PilotCitiesDashboardUmisWorkbookselectionCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('workbookSelectionCtrl', ['$scope', '$state', function ($scope, $state) {
    $scope.selectedWorkbooks = {
      'water': false,
      'materials': false,
      'energy': false,
      'mobility': false
    }
    $scope.workbookStore = ['app.city.pilot.umis.form.endPage'];

    $scope.workbookGenerator = function(){
      $scope.workbookStore = [];
      _.forEach($scope.selectedWorkbooks, function(value, key){
       if(value === true){
        $scope.workbookStore.push($scope.workbookValues[key]);
       }
      });
      $scope.workbookStore.push('app.city.pilot.umis.form.endPage');
    };
    $scope.workbookIterator = function(){
      return $state.go($scope.workbookStore.shift());
    };

    $scope.workbookValues = {
      water: 'app.city.pilot.umis.form.waterWorkbook.landCoverPreCalc',
      materials: 'app.city.pilot.umis.form.materialsWorkbook',
    }

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:PilotCitiesDashboardUmisWorkbookselectionCtrl
 * @description
 * # PilotCitiesDashboardUmisWorkbookselectionCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('workbookSelectionCtrl', ['$scope', '$state', 'workbookSelection', function ($scope, $state, workbookSelection) {
    $scope.workbookSelection = workbookSelection;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

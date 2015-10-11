'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:PilotCitiesDashboardUmisWaterworkbookCtrl
 * @description
 * # PilotCitiesDashboardUmisWaterworkbookCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('waterWorkbookCtrl', ['$scope', 'workbookSelection', function ($scope, workbookSelection) {
    $scope.workbookSelection = workbookSelection;
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

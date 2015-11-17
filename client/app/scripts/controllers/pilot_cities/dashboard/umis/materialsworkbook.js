'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:PilotCitiesDashboardUmisMaterialsworkbookCtrl
 * @description
 * # PilotCitiesDashboardUmisMaterialsworkbookCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('materialsWorkbookCtrl', ['$scope', 'workbookSelection', function ($scope, workbookSelection) {
    $scope.workbookSelection = workbookSelection;
    $scope.optionSelected = 'A'
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

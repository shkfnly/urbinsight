'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

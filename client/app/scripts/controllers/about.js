'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('AboutCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

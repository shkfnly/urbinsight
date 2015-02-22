'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DashboardVancouverCtrl
 * @description
 * # DashboardVancouverCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CitiesCtrl', function ($scope, $location) {
    debugger
    $scope.$cities = {
      'vancouver' : {
        lat: "49.2827",
        lon: "123.1207"
      },
      'medellin' : { },
      'cairo' : {},
      'casablanca' : {}
    };
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

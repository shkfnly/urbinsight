'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UserDashboardCtrl
 * @description
 * # UserDashboardCtrl
 * Controller of the urbinsight platform to display userDashboard
 */
angular.module('urbinsight')
  .controller('UserDashboardCtrl', ['$scope', '$location', '$stateParams', function ($scope, $location, $stateParams) {
    // $scope.addMap = function(){
    // var L = window.L;
    //   L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
    //   $scope.map = L.mapbox.map('dashboardMap', 'urbinsight.l906cd2j', {zoomControl: true, minZoom: 3})
    //   .setView([0,0], 3);
    // };

    // $scope.addMap();
    // $scope.$stateParams = $stateParams;

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

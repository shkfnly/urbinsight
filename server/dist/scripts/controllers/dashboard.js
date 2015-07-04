'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('DashboardCtrl', function ($scope, $location, $stateParams) {
    $scope.addMap = function(){
    var L = window.L;
      L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
      $scope.map = L.mapbox.map('dashboardMap', 'urbinsight.l906cd2j', {zoomControl: true, minZoom: 3})
      .setView([0,0], 3);
    };

    $scope.addMap();
    $scope.$stateParams = $stateParams;
  });

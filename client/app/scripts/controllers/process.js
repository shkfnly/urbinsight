'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:ProcessCtrl
 * @description
 * # ProcessCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('ProcessCtrl', function ($scope) {

    $scope.addMap = function(){
      var L = window.L;
      L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
      var map = L.mapbox.map('pilotProcessMap', 'urbinsight.jh7lje5c', {zoomControl: false})
      .setView([0,0], 2);
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
    };
    $scope.addMap();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

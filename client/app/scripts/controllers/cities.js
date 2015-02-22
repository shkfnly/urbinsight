'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DashboardVancouverCtrl
 * @description
 * # DashboardVancouverCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CitiesCtrl', function ($scope, $location, $http) {
    $scope.$cities = {
      'vancouver' : {
        lat: '49.2496600',
        lon: '-123.1193400'
      },
      'medellin' : {},
      'cairo' : {},
      'casablanca' : {}
    };

    $scope.$colors = {
      'source': '#9c89cc',
      'upstream' : '#7ec9b1',
      'demand'  : '#3ca0d3',
      'downstream' : '#fa946e',
      'sink' : '#f1f075'
    };

    var L;

    $scope.L = L = window.L;

    var cityString = $location.path().split('/')[2];
    var city;

    $scope.$city = city = $scope.$cities[cityString];

    $scope.renderMap = function() {
      L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
      $scope.map = L.mapbox.map('cityMap', 'urbinsight.l906cd2j', {zoomControl: true, minZoom: 3})
      .setView([city.lat, city.lon], 12);
    };

    $scope.renderMap();

    $scope.fetchNodes = function () {
      var request = $http.get('/data/label/' + cityString);
      var scope = $scope;
      request.success(function (data, status){

        angular.forEach(data, function(type, key){
          angular.forEach(type, function(node){
            var lat = parseFloat(node.lat);
            var lng = parseFloat(node.lng);
            scope.L.marker([lat, lng], {
              icon: scope.L.mapbox.marker.icon({
                'marker-size' : 'small',
                'marker-color' : scope.$colors[key]
              })
            }).bindPopup('<p>Type: ' + key + '</p><p>Id: ' + node.id + '</p>').addTo(scope.map);
          });
        });
      });
    };
    $scope.fetchNodes();

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

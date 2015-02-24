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
        lon: '-123.1193400',
        layers: {'Vancouver Water System' : 'urbinsight.vanwatersystem'}
      },
      'medellin' : {
        lat: '6.2491',
        lon: '-75.5891',
        layers: {'Quality of Life' : 'thissaysnothing.y3cy2e29',
                 'Geological Classification' : 'thissaysnothing.Layers',
                 'Heart Disease per 100,000' : 'thissaysnothing.pjznz5mi',
                 'Youth Population Change' : 'thissaysnothing.youth_population',
                 'Youth Population Nominal' : 'thissaysnothing.8w06yldi',
                 'Nominal Senior Population' : 'thissaysnothing.senior_population',
                 'Water System' : 'thissaysnothing.water_system',
                 'Structural Axes of Public Spaces' : 'thissaysnothing.46q7iudi',
                 'Green Infrastructure' : 'thissaysnothing.5i0e8kt9'}
      },
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
      //Create Map
      L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
      $scope.map = L.mapbox.map('cityMap', {zoomControl: true, minZoom: 3})
      .setView([city.lat, city.lon], 12);
      // Create Layer Object for Layer Control
      var first = true;
      var additonalLayers = {};

      angular.forEach(city.layers, function(layer, name){
        if(first){
          additonalLayers[name] = L.mapbox.tileLayer(layer).addTo($scope.map);
          first = false;
        } else {
          additonalLayers[name] = L.mapbox.tileLayer(layer);
        }
      });

      L.control.layers({
        'Base Map': L.mapbox.tileLayer('urbinsight.l906cd2j').addTo($scope.map),
        'Toner Map': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        }),
        'Watercolor Map': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        })
      },
      additonalLayers
      ).addTo($scope.map);
    };

    $scope.renderMap();

    $scope.fetchNodes = function () {
      var request = $http.get('/data/label/' + cityString);
      var scope = $scope;
      request.success(function (data, status){
        console.log(data)
        angular.forEach(data, function(type, key){
          angular.forEach(type, function(node){
            console.log(node);
            var lat = parseFloat(node.lat);
            var lng = parseFloat(node.lng);
            console.log(lat);
            console.log(lng);
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

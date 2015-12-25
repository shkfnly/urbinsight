'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:MapCtrl
 * @description
 * Controller of the map for individual Cities

 */
angular.module('urbinsight')
  .controller('MapCtrl', ['$scope', '$location', 'Cities', 'MapFactory', function ($scope, $location, Cities, MapFactory) {

    var L;
    $scope.L = L = window.L;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';

    MapFactory.setCity($location.path().split('/')[2]);
    $scope.cityName = MapFactory.getCity();

    // var lots = new L.TileLayer.MVTSource({
    //     url: '/data/city/' + $scope.cityName + '/lots/{z}/{x}/{y}.pbf',
    //     clickableLayers: ['lots'],
    //     getIDForLayerFeature: function(feature) {
    //       return feature._id;
    //     },
    //     style: function(feature) {
    //       return {
    //         color: 'rgba(255, 0, 0, 1)', 
    //         outline: { 
    //            color: 'rgb(20,20,20)',
    //            size: 1
    //         },
    //         selected: {
    //            color: 'rgba(0, 255, 0, 1'
    //         }
    //       };
    //     }
    // });

    Cities.fetchCity($scope.cityName, MapFactory.renderMap.bind(MapFactory));
    Cities.getNodes($scope.cityName, MapFactory.renderNodes.bind(MapFactory));
    //MapFactory.renderParcels(cityName);
    //MapFactory.renderSurveys(cityName);
  }]);
        //   mapboxgl.accessToken = L.mapbox.accessToken
        //   var lots = {
        //     "version" : 8,
        //     "sources" : {
        //       "lots": {
        //         "type": "vector",
        //         "url": 
        //           "/data/city/" + $scope.city + "/lots/{z}/{x}/{y}.pbf",
        //   minZoom: 12
        //       } 
        //     },
        //     "layers" : [
        //       {
        //         "id": "parcels",
        //         "type": "fill",
        //         "source": "lots",
        //         "interactive": true,
        //         "paint": {
        //           "fill-color": '#0000FF'
        //         }
        //       }
        //     ]
        //   }
        //   $scope.map = new mapboxgl.Map({
        //      container: 'map',
        //      style: simple,
        //      zoom: 1,
        //      center: [-14, 35]
        //      })


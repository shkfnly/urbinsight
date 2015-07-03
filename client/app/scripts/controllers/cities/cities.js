'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:CitiesCtrl
 * @description
 * Controller of the individual Cities
 * THIS NEEDS TO BE REFACTORED SO THAT THE REQUESTS FOR DATA ARE COMING FROM A FACTORY AND THIS
 * IS SIMPLY MANIPULATING THEM INTO A TEMPLATE.
 */
angular.module('urbinsight')
  .controller('CitiesCtrl', function ($scope, $location, $http, Cities, ParcelFactory, MapFactory, $stateParams) {
    var L;
    $scope.L = L = window.L;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';

    $scope.gridLayers = [];
    $scope.gridControls = [];

    var cityName = $location.path().split('/')[2];
    // $scope.$city = city = $scope.$cities[cityString];
    
    $scope.overlayAddCtrl = function(e){
      $scope.gridLayer = L.mapbox.gridLayer(e.layer._tilejson.id);
      $scope.map.addLayer($scope.gridLayer);
      $scope.gridControl = L.mapbox.gridControl($scope.gridLayer);
      $scope.map.addControl($scope.gridControl);
    };

///REMOVING DOES NOT WORK FOR SOME REASON
    $scope.overlayRmvCtrl = function(e){
      for (var i = 0; i < $scope.gridLayers.length; i++){
        if($scope.gridLayers[i]._tilejson.id === e.layer._tilejson.id){
          $scope.map.removeLayer($scope.gridLayers[i]);
          $scope.map.removeControl($scope.gridControls[i]);
          $scope.gridLayers.splice(i, 1);
          // console.log($scope.gridLayers);
          $scope.gridControls.splice(i, 1);
          break;
        }
      }
    };

    $scope.additonalLayers = function(cityLayers){
      var first = true;
      var Layers = {};
      angular.forEach(cityLayers, function(layer, name){
        if(first){
          Layers[name] = L.mapbox.tileLayer(layer).addTo($scope.map);
          $scope.gridLayer = L.mapbox.gridLayer(layer);
          $scope.gridLayers.push($scope.gridLayer);
          $scope.map.addLayer($scope.gridLayer);
          $scope.gridControl = L.mapbox.gridControl($scope.gridLayer);
          $scope.gridControls.push($scope.gridControl);
          $scope.map.addControl($scope.gridControl);

          first = false;
        } else {
          Layers[name] = L.mapbox.tileLayer(layer);
        }
      });
      return Layers;
    };
// urbinsight.150c04d2
    $scope.addLayerControl = function(addtLayers){
      L.control.layers({
        'Base Map': L.mapbox.tileLayer('urbinsight.1114602d').addTo($scope.map),
        'Satellite Map' : L.mapbox.tileLayer('urbinsight.l906cd2j'),
        'Toner Map': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        }),
        'Watercolor Map': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        })
      },
      addtLayers
      ).addTo($scope.map);
    };



    $scope.renderMap = function(city) {
      // Create Map
        $scope.city = city;
        $scope.map = L.mapbox.map('cityMap')
        .setView([city.lat, city.lon], 12);
        MapFactory.setMap($scope.map);
        var featureGroup = L.featureGroup().addTo($scope.map);
        $scope.layerDefs = city.layerDefinitions;
        $scope.addLayerControl($scope.additonalLayers(city.layers));
        $scope.map.on('overlayadd', $scope.overlayAddCtrl);
        $scope.map.on('overlayremove', $scope.overlayRmvCtrl);

        $scope.map.on('draw:created', function(e) {
          var type = e.layerType,
              layer = e.layer;
              // console.log(layer);
        });

        $scope.map.on('dragend', function(e) {
          // console.log(e);
        });

        var drawControl = new L.Control.Draw({
          edit: {
          featureGroup: featureGroup
          }
        }).addTo($scope.map);
        $scope.map.on('draw:created', function(e) {
          featureGroup.addLayer(e.layer);
        });
    };

    $scope.linesAdded = [];

    $scope.drawFlows = function(node) {
      var request = $http.get('/data/relation/' + node.id);
      var scope = $scope;
      request.success(function (data, status) {
        angular.forEach(scope.linesAdded, function(line){
          scope.map.removeLayer(line);
        });
        angular.forEach(data, function(relation){
          scope.linesAdded.push(L.polyline(relation, {color: 'teal', opacity: 1, weight: 10}).addTo(scope.map));
        });
      });
      request.error( function (data, status) {
      });
    };

    $scope.renderNodes = function (data) {     
      var map = $scope.map;
      angular.forEach(data, function(type, key){
        var markers = new L.MarkerClusterGroup({
          iconCreateFunction: function(cluster) {
            return L.mapbox.marker.icon({
              'marker-symbol' : cluster.getChildCount(),
              'marker-color' : Cities.allColors()[key]
            });
          }
        });
        angular.forEach(type, function(node){
          var lat = parseFloat(node.lat);
          var lng = parseFloat(node.lng);
          var mark = $scope.L.marker([lat, lng], {
            icon: $scope.L.mapbox.marker.icon({
              'marker-size' : 'small',
              'marker-color' : Cities.allColors()[key]
            })
          }).bindPopup('<p>Type: ' + key + '</p><p>Id: ' + node.id + '</p>')
          .on('click', function(){$scope.drawFlows(node);});
          markers.addLayer(mark);
          $scope.markers = markers;
        });
         
        $scope.map.addLayer(markers);
      });
    };
    Cities.fetchCity(cityName, $scope.renderMap);
    Cities.getNodes(cityName, $scope.renderNodes);
    // Cities.createCity(cityName);

    // $scope.testLayers = {
    //   'Region'  : {
    //   },

    //   'City'    : {
    //     'Environmental' :  [
    //       { 'name': 'Solid Waste Generation',
    //         'mapboxID': 'placeholder'},
    //       { 'name': 'Mining Concessions',
    //         'mapboxID': 'placeholder'}
    //     ]  
    //   },

    //   'Community'  : {
    //     'Infrastructure' : [
    //       { 'name': 'Community Resources',
    //         'mapboxID': 'placeholder'},
    //       { 'name': 'Jose Galvez - Zoning',
    //         'mapboxID': 'placeholder'}
    //     ],
    //     'Social' : [
    //       { 'name': 'Hillside Census',
    //         'mapboxID': 'placeholder'},
    //       { 'name': 'Public Health',
    //         'mapboxID': 'placeholder'}
    //     ],
    //     'Geographic': [
    //       { 'name': 'Topological',
    //         'mapboxID': 'placeholder'}
    //     ]
    //   }
    // };

  });

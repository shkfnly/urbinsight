'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:CitiesCtrl
 * @description
 * Controller of the individual Cities

 */
angular.module('urbinsight')
  .controller('CitiesCtrl', ['$scope', '$location', '$http', 'Cities', 'ParcelFactory', 'MapFactory', '$stateParams', function ($scope, $location, $http, Cities, ParcelFactory, MapFactory, $stateParams) {
    var customForEach = function (collection, callback){

      if(Array.isArray(collection)){
        for(var i = 0; i < collection.length; i++){
          callback(collection[i], i, collection);
        }
      }
      else {
        for(var item in collection){
          callback(collection[item], item, collection);
        }
      }
    };

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
        // This is weird I create the map and then set the map from the same object...change this implementation.
        $scope.map = MapFactory.createMap()
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

        $scope.map.on('moveend', function(e) {
          var SW, SE, NE, NW;
          var boundObj = e.target.getBounds();
          SW = MapFactory.flipToLngLatArray(boundObj.getSouthWest());
          SE = MapFactory.flipToLngLatArray(boundObj.getSouthEast());
          NE = MapFactory.flipToLngLatArray(boundObj.getNorthEast()); 
          NW = MapFactory.flipToLngLatArray(boundObj.getNorthWest());
          MapFactory.currentGeoJSONBounds = [SW, SE, NE, NW, SW];
          ParcelFactory.fetchLots(cityName, function(data){
            MapFactory.renderLots(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds}})
          
          ParcelFactory.fetchParcels(cityName, function(data){
            ParcelFactory.setParcelsInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds}});
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

    var popupgen = function(node, type){
      var popupstring = '<div><h2 style="text-align: center;">Junction Information</h2><p>Stage: ' + type + '</p><br />';
      customForEach(node, function(value, attrib){
        popupstring += '<p>' + attrib + ': ' + value + '</p><br />';
      });
      return popupstring + '</div>';
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
        // '<p>Type: ' + key + '</p><p>Id: ' + node.id + '</p>'
        angular.forEach(type, function(node){
          var lat = parseFloat(node.lat);
          var lng = parseFloat(node.lng);
          var mark = $scope.L.marker([lat, lng], {
            icon: $scope.L.mapbox.marker.icon({
              'marker-size' : 'small',
              'marker-color' : Cities.allColors()[key]
            })
          }).bindPopup(popupgen(node, key))
          .on('click', function(){$scope.drawFlows(node);});
          if(markers) { markers.addLayer(mark) };
          $scope.markers = markers;
        });
         
        $scope.map.addLayer(markers);
      });
    };
    Cities.fetchCity(cityName, $scope.renderMap);
    Cities.getNodes(cityName, $scope.renderNodes);
    MapFactory.renderParcels(cityName);
    MapFactory.renderSurveys(cityName);
    // Cities.createCity(cityName);
  }]);

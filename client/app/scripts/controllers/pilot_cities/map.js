'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:MapCtrl
 * @description
 * Controller of the map for individual Cities

 */
angular.module('urbinsight')
  .controller('MapCtrl', ['$scope', '$location', '$http', 'Cities', 'ParcelFactory', 'QOLFactory', 'MapFactory', 'abuDhabiStyles', '$stateParams', function ($scope, $location, $http, Cities, ParcelFactory, QOLFactory, MapFactory, abuDhabiStyles, $stateParams) {

    var L;
    $scope.L = L = window.L;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';

    $scope.gridLayers = [];
    $scope.gridControls = [];

    var cityName = $location.path().split('/')[2];
    var firstHalf ='http://52.25.79.157/geoserver/wfs?request=GetFeature&typeName='
    var secondHalf = '&outputformat=json'
    
    
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

    $scope.addLayerControl = function(addtLayers){
      if (cityName == 'abudhabi') {
       var abuDhabiLayerNames = ['parking', 'buildingplinth', 'buildingoverhang', 'buildingmiscconstruction', 'buildingcourtyard', 'building', 'plot', 'albateen_district', 'community', 'district'].reverse();
       var  addtLayers = {};
        _.forEach(abuDhabiLayerNames, function(layerName){
            addtLayers[layerName] = L.mapbox.featureLayer(null, {style: abuDhabiStyles.getStyle(layerName)}).loadURL(firstHalf + layerName + secondHalf).on('ready', function(layer){ this.eachLayer(function(polygon){
              /*var content = '';
              _.forEach(polygon.feature.properties, function(value, key){
                content += key + ' : ' + value + '<br />'
              })*/
              polygon.bindPopup(polygon.feature.properties['PRIMARYU_1']);
            })
          });
        })
        _.forEach(addtLayers, function(layer){
          layer.on('mouseover', function(e) {
            e.layer.openPopup();
          })
          layer.on('mouseout', function(e) {
            e.layer.closePopup();
          })
        })
      }
      
      L.control.layers({
        'Satellite Map' : L.mapbox.tileLayer('mapbox.streets-satellite'),
        'Streets Map' : L.mapbox.tileLayer('mapbox.streets').addTo($scope.map),
        'Urbinsight Map': L.mapbox.tileLayer('urbinsight.1114602d'),
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
        MapFactory.setMap($scope.map);
        var featureGroup = L.featureGroup().addTo($scope.map);
        $scope.addLayerControl($scope.additonalLayers(city.layers));
        $scope.map.on('overlayadd', $scope.overlayAddCtrl);
        $scope.map.on('overlayremove', $scope.overlayRmvCtrl);

        $scope.map.on('draw:created', function(e) {
          var type = e.layerType,
              layer = e.layer;
        });
        $scope.map.on('viewreset', function(e){
          var boundObj = e.target.getBounds();
          MapFactory.transformBounds(boundObj);
          /*ParcelFactory.fetchLots(cityName, function(data){
          //I could make these queries using features at
          MapFactory.renderLots(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
          */
          ParcelFactory.fetchParcels(cityName, function(data){
            ParcelFactory.setParcelsInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
          
          QOLFactory.fetchSurveys(cityName, function(data){
            QOLFactory.setSurveysInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
        })
        
        $scope.map.setView([city.lat, city.lon], 12);
        
        $scope.map.on('moveend', function(e) {
          var boundObj = e.target.getBounds();
          MapFactory.transformBounds(boundObj);
         /* ParcelFactory.fetchLots(cityName, function(data){
          //I could make these queries using features at
          MapFactory.renderLots(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
          */
          ParcelFactory.fetchParcels(cityName, function(data){
            ParcelFactory.setParcelsInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
          
          QOLFactory.fetchSurveys(cityName, function(data){
            QOLFactory.setSurveysInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
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
      _.forEach(node, function(value, attrib){
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
  }]);

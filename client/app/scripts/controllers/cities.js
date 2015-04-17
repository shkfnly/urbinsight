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
  .controller('CitiesCtrl', function ($scope, $location, $http, Cities) {

    // $scope.$cities = {
    //   'vancouver' : {
    //     lat: '49.2496600',
    //     lon: '-123.1193400',
    //     layers: {'Water Mains' : 'urbinsight.vanWaterNetwork',
    //              'Sources' : 'urbinsight.vancouverwatersources',
    //              'Upstream' : 'urbinsight.vanupstream',
    //              'Parcels' : 'urbinsight.qmfmkj4i',
    //              'Downstream' : 'urbinsight.vandownstream',
    //              'Sinks' : 'urbinsight.larr7ldi'}
    //   },
    //   'medellin' : {
    //     lat: '6.2491',
    //     lon: '-75.5891',
    //     layers: {'Quality of Life' : 'thissaysnothing.y3cy2e29',
    //              'Geological Classification' : 'thissaysnothing.Layers',
    //              'Heart Disease per 100,000' : 'thissaysnothing.pjznz5mi',
    //              'Youth Population Change' : 'thissaysnothing.youth_population',
    //              'Youth Population Nominal' : 'thissaysnothing.8w06yldi',
    //              'Nominal Senior Population' : 'thissaysnothing.senior_population',
    //              'Water System' : 'thissaysnothing.water_system',
    //              'Structural Axes of Public Spaces' : 'thissaysnothing.46q7iudi',
    //              'Green Infrastructure' : 'thissaysnothing.5i0e8kt9'}
    //   },
    //   'cairo' : {
    //     lat: '30.0600',
    //     lon: '31.2333',
    //     layers: {
    //              'Water Quality' : 'urbinsight.cairowaterquality',
    //              'Parcel Audit' : 'urbinsight.cairoparcelaudit',
    //              'Air Quality'  : 'urbinsight.cairoairquality',
    //              'Unemployment Rate' : 'urbinsight.cairolaborpop',
    //              'Marital Rate' : 'urbinsight.cairomaritalpopulation',
    //              'School Enrollment Rate' : 'urbinsight.cairoschoolpop',
    //              'Youth Population Percentage' : 'urbinsight.youthpopforcairo',
    //              'Total Population' : 'urbinsight.cairototalpopulation',
    //              }
    //   },
    //   'casablanca' : {
    //     lat: '33.5333',
    //     lon: '-7.5833'
    //   },
    //   'lima' : {
    //     lat: '-12.0433',
    //     lon: '-77.0283'
    //   }
    // };

    // $scope.$colors = {
    //   'source': '#9c89cc',
    //   'upstream' : '#7ec9b1',
    //   'demand'  : '#3ca0d3',
    //   'downstream' : '#fa946e',
    //   'sink' : '#f1f075'
    // };



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
        debugger;
        if($scope.gridLayers[i]._tilejson.id === e.layer._tilejson.id){
          $scope.map.removeLayer($scope.gridLayers[i]);
          $scope.map.removeControl($scope.gridControls[i]);
          $scope.gridLayers.splice(i, 1);
          // console.log($scope.gridLayers);
          $scope.gridControls.splice(i, 1);
          console.log($scope.gridControls);
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
      L.control.layers({
        'Base Map': L.mapbox.tileLayer('urbinsight.150c04d2').addTo($scope.map),
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
      // var request = $http.get('/data/city/' + cityString);
      // request.success( function(city, status){
      // Create Map
        console.log(city);
        $scope.city = city;
        $scope.map = L.mapbox.map('cityMap', {zoomControl: true, minZoom: 3, drawControl: true})
        .setView([city.lat, city.lon], 12);
        var featureGroup = L.featureGroup().addTo($scope.map);
        $scope.layerDefs = city.layerDefinitions;
        $scope.addLayerControl($scope.additonalLayers(city.layers));
        $scope.map.on('overlayadd', $scope.overlayAddCtrl);
        $scope.map.on('overlayremove', $scope.overlayRmvCtrl);
        var drawControl = new L.Control.Draw({
          edit: {
          featureGroup: featureGroup
          }
        }).addTo($scope.map);
        $scope.map.on('draw:created', function(e) {
          featureGroup.addLayer(e.layer);
        });
      // });
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

    $scope.fetchNodes = function (scope, data) {
      // var request = $http.get('/data/label/' + cityString);
      // var scope = $scope;
      angular.forEach(data, function(type, key){
        var markers = new L.MarkerClusterGroup({
          iconCreateFunction: function(cluster) {
            return L.mapbox.marker.icon({
              'marker-symbol' : cluster.getChildCount(),
              'marker-color' : scope.$colors[key]
            });
          }
        });
        angular.forEach(type, function(node){
          var lat = parseFloat(node.lat);
          var lng = parseFloat(node.lng);
          var mark = scope.L.marker([lat, lng], {
            icon: scope.L.mapbox.marker.icon({
              'marker-size' : 'small',
              'marker-color' : scope.$colors[key]
            })
          }).bindPopup('<p>Type: ' + key + '</p><p>Id: ' + node.id + '</p>')
          .on('click', function(){scope.drawFlows(node);});
          markers.addLayer(mark);
          $scope.markers = markers;
        });
        $scope.map.addLayer(markers);
      });
    };

    Cities.fetchCity(cityName, $scope.renderMap);
    Cities.getNodes(cityName, $scope, $scope.fetchNodes);
    // Cities.createCity(cityName);

  });

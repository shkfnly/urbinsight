'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:QolCtrl
 * @description
 * # QolCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('qolCtrl', function ($scope, $http, $stateParams, MapFactory, QOLFactory) {

    var L = window.L;
    var survey;
    $scope.survey = survey = QOLFactory.getCurrentSurvey();
    $scope.survey.cityName = $stateParams.cityName;
    $scope.cityName = $stateParams.cityName;

    var marker;
    $scope.marker = marker;

    console.log($scope.marker);

    // MapFactory.markerClickControl('survey', QOLFactory, $scope);
    MapFactory.getMap().on('click', function(e) {
      if(MapFactory.getMap().hasLayer($scope.marker)){
        MapFactory.getMap().removeLayer($scope.marker);
      }
      $scope.parcel = QOLFactory.setGeoCoordinates(e.latlng);
      $scope.marker = L.marker(e.latlng, {
        icon: L.mapbox.marker.icon({
          'marker-size' : 'medium',
          'marker-color' : '#FFE11A'
        }),
        draggable: true
      });
      QOLFactory.setCurrentMarker($scope.marker);
      $scope.marker.addTo(MapFactory.getMap());
      $scope.marker.on('move', function (e) {
        $scope.parcel = QOLFactory.setGeoCoordinates(e.latlng);
      });
    });

    MapFactory.renderSurveys($stateParams.cityName);
   
    

    $scope.submit = function(){

      QOLFactory.saveCurrentSurvey($scope.cityName, function(){});

      // MapFactory.removeCurrentMarker();
      //       debugger
      console.log($scope.marker);
      MapFactory.getMap().removeLayer(QOLFactory.getCurrentMarker());
      MapFactory.renderSurveys($stateParams.cityName);
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

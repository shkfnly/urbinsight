'use strict';

angular.module('urbinsight')
  .controller('qolDataEntryCtrl', ['$scope', '$http', '$stateParams', 'MapFactory', 'QOLFactory', function($scope, $http, $stateParams, MapFactory, QOLFactory){
  	var L = window.L;
  	var survey;
  	$scope.QOLFactory = QOLFactory;
  	$scope.survey = survey = QOLFactory.getCurrentSurvey();
  	$scope.survey.cityName = $stateParams.cityName;
  	$scope.cityName = $stateParams.cityName;

  	var marker;
    $scope.marker = marker;

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
      // console.log($scope.marker);
      MapFactory.getMap().removeLayer(QOLFactory.getCurrentMarker());
      MapFactory.renderSurveys($stateParams.cityName);
    };

  }]);

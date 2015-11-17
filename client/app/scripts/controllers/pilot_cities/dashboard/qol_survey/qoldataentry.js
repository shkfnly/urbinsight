'use strict';

angular.module('urbinsight')
  .controller('qolDataEntryCtrl', ['$scope', '$http', '$stateParams', 'MapFactory', 'QOLFactory', function($scope, $http, $stateParams, MapFactory, QOLFactory){
  	var survey;
  	$scope.QOLFactory = QOLFactory;
  	$scope.survey = survey = QOLFactory.getCurrentSurvey();
  	$scope.survey.cityName = $stateParams.cityName;
  	$scope.cityName = $stateParams.cityName;

  	var marker;
    $scope.marker = marker;
    
    var markerAdd = function(e) {
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
    }
    MapFactory.getMap().on('click', markerAdd);

    MapFactory.renderSurveys($stateParams.cityName);
    $scope.submit = function(){
      QOLFactory.saveCurrentSurvey($scope.cityName, function(){});
      // MapFactory.removeCurrentMarker();
      if(typeof QOLFactory.getCurrentMarker() != 'undefined'){
        MapFactory.getMap().removeLayer(QOLFactory.getCurrentMarker());
      }
      MapFactory.getMap().off('click', markerAdd);
      MapFactory.renderSurveys($stateParams.cityName);
    };

  }]);

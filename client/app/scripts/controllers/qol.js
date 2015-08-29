'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:QolCtrl
 * @description
 * # QolCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('qolCtrl', ['$scope', '$http', '$stateParams', 'MapFactory', 'QOLFactory', function ($scope, $http, $stateParams, MapFactory, QOLFactory) {

    var L = window.L;
    var survey;
    $scope.survey = survey = QOLFactory.getCurrentSurvey();
    $scope.survey.cityName = $stateParams.cityName;
    $scope.cityName = $stateParams.cityName;
    $scope.surveys = QOLFactory.surveysInView;
    $scope.surveyData;
    var marker;
    $scope.marker = marker;

    // console.log($scope.marker);

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
    var generateSurveyTotals = function(surveys) {
      surveys = surveys || [];
      var totalNumber = surveys.length;
      var results = {};
      surveys.forEach(function(survey){
        _.forEach(survey, function(response, question){
          results[question] = results[question] || 0;
          switch (response) {
            case 'excellent':
              results[question] += 5;
              break;
            case 'good':
              results[question] += 4;
              break;
            case 'adequate':
              results[question] += 3;
              break;
            case 'insufficient':
              results[question] += 2;
              break;
            case 'absent':
              results[question] += 1;
              break;
            case 'unknown':
              results[question] += 0;
              break;
            default:
        
          }  
        });
      });
      totalNumber = totalNumber || 1;
      return _.mapValues(results, function(value, key) {
        return value/totalNumber;
      });
    };

    $scope.surveyData = {};

    $scope.$watch('QOLFactory.surveysInView', function(newValue, oldValue, scope){
      scope.surveys = QOLFactory.surveysInView;
      scope.surveyData = QOLFactory.surveysInView;
    }, true);
    

    $scope.submit = function(){

      QOLFactory.saveCurrentSurvey($scope.cityName, function(){});

      // MapFactory.removeCurrentMarker();
      //       debugger
      // console.log($scope.marker);
      MapFactory.getMap().removeLayer(QOLFactory.getCurrentMarker());
      MapFactory.renderSurveys($stateParams.cityName);
    };



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:QolCtrl
 * @description
 * # QolCtrl
 * Controller of the urbinsight Quality of Life survey data
 */
angular.module('urbinsight')
  .controller('qolCtrl', ['$scope', '$http', '$stateParams', 'MapFactory', 'QOLFactory', function ($scope, $http, $stateParams, MapFactory, QOLFactory) {

    $scope.QOLFactory = QOLFactory;
    $scope.surveys = QOLFactory.surveysInView;
    // $scope.surveyData;

    // console.log($scope.marker);
    // MapFactory.markerClickControl('survey', QOLFactory, $scope);

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
      scope.surveys = newValue;
      scope.surveyData = generateSurveyTotals(newValue);
      console.log(scope.surveyData)
    }, true);

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

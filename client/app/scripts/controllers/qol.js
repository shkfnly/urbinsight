'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:QolCtrl
 * @description
 * # QolCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('qolCtrl', function ($scope, $http, $stateParams, MapFactory) {

    var survey;

    $scope.cityName = $stateParams.city_name;

    $scope.survey = survey = {geoCoordinates: []};
    $scope.survey.cityName = $stateParams.city_name;

    MapFactory.getMap().on('click', function(e) {
      $scope.survey.geoCoordinates[0] = e.latlng.lat;
      $scope.survey.geoCoordinates[1] = e.latlng.lng;
    })

    $scope.submit = function(cityName){
      var that = this;
      $http.post('/data/city/' + cityName + '/qol_surveys/', {qol: survey}).
        success(function(data, status, headers, config) {
          console.log(data);
        }).
        error(function(data, status, headers, config ) {

        })
    }
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

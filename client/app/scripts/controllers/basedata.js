'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:BasedataCtrl
 * @description
 * # BasedataCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('BasedataCtrl', function ($scope, $stateParams, Cities) {

    Cities.fetchCity($stateParams.city_name, function(data){
      $scope.layerDefs = data.layerDefinitions;
    })
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

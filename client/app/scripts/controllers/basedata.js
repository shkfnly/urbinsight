'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:BasedataCtrl
 * @description
 * # BasedataCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('BasedataCtrl', ['$scope', '$stateParams', 'Cities', function ($scope, $stateParams, Cities) {

    Cities.fetchCity($stateParams.cityName, function(data){
      $scope.layerDefs = data.layerDefinitions;
    });
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

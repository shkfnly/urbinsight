'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:PilotsCtrl
 * @description
 * # PilotsCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('PilotsCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.imgLoader = function() {
      window.$(document).ready(function(){
        window.$('.pilot-city').hover(function(){
          window.$(this).removeClass('darken');
        }, 
        function(){
          window.$(this).addClass('darken');
        });
      });
    };
    $scope.go = function(place){
     $location.path('/dashboard/' + place);
    }
  $scope.imgLoader();
  }]);

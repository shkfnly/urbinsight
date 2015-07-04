'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:PilotsCtrl
 * @description
 * # PilotsCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('PilotsCtrl', function ($scope) {
    $scope.imgLoader = function() {
      window.$(document).ready(function(){
    window.$('#medellin').hover(function(){
    window.$(this).removeClass('darken');
    
  },
    function(){
    window.$(this).addClass('darken');
    });

      window.$('#cairo').hover(function(){
    window.$(this).removeClass('darken');
    
  },
    function(){
    window.$(this).addClass('darken');
    });

      window.$('#casablanca').hover(function(){
    window.$(this).removeClass('darken');
    
  },
    function(){
    window.$(this).addClass('darken');
    });
  });
  
    };
  $scope.imgLoader();
  $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

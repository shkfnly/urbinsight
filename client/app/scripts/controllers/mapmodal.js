'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MapModalCtrl
 * @description
 * # MapModalCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MapModalCtrl', function ($scope) {

    $('#plusclick').on('click', function(event){
      $('#plusclick').toggleClass('opened');
      $('#mapModal').toggleClass('hoveredon');
      $('#modalbar').toggleClass('shown');
    });



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

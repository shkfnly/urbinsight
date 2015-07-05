'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:MapModalCtrl
 * @description
 * # MapModalCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('MapModalCtrl', ['$scope', function ($scope) {



    $('#plusclick').on('click', function(event){
      $('#plusclick').toggleClass('opened');
      $('#mapModal').toggleClass('hoveredon');
      $('#modalbar').toggleClass('shown');
    });

  }]);

'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UmisdataentryCtrl
 * @description
 * # UmisdataentryCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('umisDataEntryCtrl', function ($scope) {
    var whyy, parcel;
    $scope.parcel = parcel = {};
    $scope.whyy = whyy = {};


    whyy.submit = function () {
      console.log(parcel);
    }

    (function(){
      $('.hoveredon').css('margin-top', '10vh');
    })()

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

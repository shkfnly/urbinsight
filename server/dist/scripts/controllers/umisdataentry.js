'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UmisdataentryCtrl
 * @description
 * # UmisdataentryCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('umisDataEntryCtrl', function ($scope, $http, $stateParams, ParcelFactory, MapFactory) {

    var parcel;

    $scope.parcel = parcel = ParcelFactory.getCurrentParcel();
    $scope.parcel.cityName = $stateParams.city_name;

    MapFactory.renderParcels($stateParams.city_name);

    $scope.submit = function () {
      ParcelFactory.saveParcel($stateParams.city_name, function(param){});
      MapFactory.getMap().removeLayer(ParcelFactory.getCurrentMarker());
      MapFactory.renderParcels($stateParams.city_name);
    }

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

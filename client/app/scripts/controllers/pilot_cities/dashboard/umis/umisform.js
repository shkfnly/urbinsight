'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UmisdataentryCtrl
 * @description
 * # UmisdataentryCtrl
 * Controller of the urbinsight data entry form
 */
angular.module('urbinsight')
  .controller('umisFormCtrl', ['$scope', '$http', '$stateParams', 'ParcelFactory', 'MapFactory', function ($scope, $http, $stateParams, ParcelFactory, MapFactory) {

    var parcel;

    $scope.parcel = parcel = ParcelFactory.getCurrentParcel();
    $scope.parcel.cityName = $stateParams.cityName;

    //MapFactory.renderParcels($stateParams.cityName);

    $scope.umisSubmit = function () {
      ParcelFactory.saveParcel($stateParams.cityName, function(){});
      if(typeof ParcelFactory.getCurrentMarker() != 'undefined'){
        MapFactory.getMap().removeLayer(ParcelFactory.getCurrentMarker());}
      MapFactory.renderParcels($stateParams.cityName);
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:DescribeparcelCtrl
 * @description
 * # DescribeparcelCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('describeParcelCtrl', function ($scope, ParcelFactory, MapFactory) {
    
    var parcel;
    $scope.parcel = parcel = ParcelFactory.getCurrentParcel();
    
    var marker;
    $scope.marker = marker;
    
    MapFactory.markerClickControl('parcel', ParcelFactory, $scope);
  });

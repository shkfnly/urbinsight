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
    var L = window.L;
    var parcel;
    $scope.parcel = parcel = ParcelFactory.getCurrentParcel();
    
    var marker;
    $scope.marker = marker;
    
    // MapFactory.markerClickControl('parcel', ParcelFactory, $scope);

    MapFactory.getMap().on('click', function(e) {
      if(MapFactory.getMap().hasLayer($scope.marker)){
        MapFactory.getMap().removeLayer($scope.marker);
      }
      $scope.parcel = ParcelFactory.setGeoCoordinates(e.latlng);
      $scope.marker = L.marker(e.latlng, {
        icon: L.mapbox.marker.icon({
          'marker-size' : 'medium',
          'marker-color' : '#FFE11A'
        }),
        draggable: true
      });
      ParcelFactory.setCurrentMarker($scope.marker);
      $scope.marker.addTo(MapFactory.getMap());
      $scope.marker.on('move', function (e) {
        $scope.parcel = ParcelFactory.setGeoCoordinates(e.latlng);
      });
    });
  });

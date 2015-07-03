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
    // var marker;


    // $scope.marker = marker;
    $scope.parcel = parcel = ParcelFactory.getCurrentParcel();
    $scope.parcel.cityName = $stateParams.city_name;


    // MapFactory.getMap().on('click', function(e) {

    //   $scope.parcel = ParcelFactory.setGeoCoordinates(e.latlng);
    //   $scope.marker = L.marker(e.latlng, {
    //     icon: L.mapbox.marker.icon({
    //       'marker-size' : 'medium',
    //       'marker-color' : '#FFE11A'
    //     }),
    //     draggable: true
    //   })
    //   // console.log($scope.marker);
    //   $scope.marker.addTo(MapFactory.getMap())
    //   $scope.marker.on('move', function (e) {
    //     $scope.parcel = ParcelFactory.setGeoCoordinates(e.latlng);
    //     console.log($scope.parcel)
    //   })
    // });

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

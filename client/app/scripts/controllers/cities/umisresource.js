'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UmisresourceCtrl
 * @description
 * # UmisresourceCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('umisResourceCtrl', ['$scope', '$stateParams', 'ParcelFactory', 'UMISFactory', function ($scope, $stateParams, ParcelFactory, UMISFactory) {
    $scope.ParcelFactory = ParcelFactory;
    $scope.parcels = ParcelFactory.parcelsInView;
    var workbooks = ['water', 'energy', 'materials', 'mobility'];
    var generateUMISTotals = function(parcels){
      var results = {};
      workbooks.forEach(function(resource){
        results[resource] = {};
      });
      parcels.forEach(function(parcel){
        workbooks.forEach(function(resource){
          if(typeof parcel.totalDemand === 'undefined'){
            UMISFactory.calculateTotals(parcel);
          }
          _.forEach(parcel.totalDemand[resource], function(value, junction){
            if (typeof results[resource][junction] === 'undefined') {
              results[resource][junction] = value;
            } else {
              results[resource][junction] += value;
            }
            //result.totals[resource] ? (result.totals[resource] += value) :(result.totals[resource] = value);
          });
        });
      });
      return results;
    };




    $scope.resources = {}

    $scope.$watch('ParcelFactory.parcelsInView', function(newValue, oldVal, scope){
      scope.parcels = newValue;
      scope.resources = generateUMISTotals(newValue);
    }, true);

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

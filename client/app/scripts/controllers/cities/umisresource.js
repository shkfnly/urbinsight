'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UmisresourceCtrl
 * @description
 * # UmisresourceCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('umisResourceCtrl', ['$scope', '$stateParams', 'ParcelFactory', function ($scope, $stateParams) {
    var parcels = ParcelFactory.getParcelsInView();
    var workbooks = ["water", "energy", "materials", "mobility"];
    var generateUMISTotals = function(parcels){
      var results = {};
      parcels.forEach(function(parcel){
        workbooks.forEach(function(resource){
          _.forEach(parcel.totalDemand[resource], function(value, junction){
            retsult[resource][junction] : (result[resource][junction] += value) : (result[resouce][junction] = value);
            //result.totals[resource] ? (result.totals[resource] += value) :(result.totals[resource] = value);
          });
        });
      });
      return results;
    };
    $scope.resources = generateUMISTotals(parcels);
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

angular.module('urbinsight.services')
  .factory('ParcelFactory', function ($http) {
    var currentParcel = {
      describeParcel : {
        parcelIdentification: {
          geoCoordinates: []
        }
      }
    };

    return {
      getCurrentParcel: function(){
        return currentParcel;
      },

      createNewParcel: function(){
        currentParcel = {
          describeParcel : {
            parcelIdentification: {
              geoCoordinates: []
            }
          }
        };
        return currentParcel;
      },

      saveParcel: function(cityName, callback){
        var that = this;
        $http.post('/data/city/' + cityName + '/parcels/', {parcel: that.getCurrentParcel()}).
          success(function(data, status, headers, config) {
            that.createNewParcel();
            callback(data);

          }).
          error(function(data, status, headers, config) {

          });
      }
    };
  });
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

    var currentMarker;

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

      setGeoCoordinates: function(latlngObject) {
        currentParcel.describeParcel.parcelIdentification.geoCoordinates = [latlngObject.lat, latlngObject.lng];
        return currentParcel;
      },

      fetchParcels: function(cityName, callback) {
        $http.get('/data/city/' + cityName + '/parcels/').
          success(function(data){
            callback(data);
          }).
          error(function(){
          });
      },

      saveParcel: function(cityName, callback){
        var that = this;
        $http.post('/data/city/' + cityName + '/parcels/', {parcel: that.getCurrentParcel()}).
          success(function(data) {
            that.createNewParcel();
            callback(data);

          }).
          error(function() {

          });
      },

      setCurrentMarker: function(marker){
        currentMarker = marker;
        return currentMarker;
      },

      getCurrentMarker: function(){
        return currentMarker;
      }
    };
  });
'use strict';

angular.module('urbinsight.services')
  .factory('ParcelFactory', ['$http', 'UMISFactory', function ($http, UMISFactory) {
    var currentParcel = {
      describeParcel : {
        parcelIdentification: {
          geoCoordinates: []
        }
      }
    };

    String.prototype.capitalize = function(){
      return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var currentMarker;
    var parcelsInView = {};
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
        currentParcel.describeParcel.parcelIdentification.geoCoordinates = [latlngObject.lng, latlngObject.lat];
        return currentParcel;
      },

      fetchParcels: function(cityName, callback, options) {
        options = options || {};
        $http.get('/data/city/' + cityName + '/parcels/', options).
          success(function(data){
            callback(data);
          }).
          error(function(){
          });
      },

      saveParcel: function(cityName, callback){
        var that = this;
        var parcel = that.getCurrentParcel();
        UMISFactory.calculateTotals(parcel);
        that.generateParcelPopUp(parcel)
        $http.post('/data/city/' + cityName + '/parcels/', {parcel: that.getCurrentParcel()}).
          success(function(data) {
            that.createNewParcel();
            callback(data);
          }).
          error(function() {
          });
      },
      generateParcelPopUp: function(parcel){
        parcel.popUp = ''
        _.forEach(parcel.totalDemand, function(demandObj, resource){
          parcel.popUp += '<div><h2 style="text-align: center;">Demand Summary - ' + resource.toString().capitalize() + '</h2>'
          _.forEach(demandObj, function(value, useCase) {
            parcel.popUp += '<p>' + useCase.toString().capitalize() + ': ' + value + '</p><br/>';
          })
          parcel.popUp += '</div>'
        })
        parcel.popUp += '<p><strong><em>Date Added: ' + parcel.date + '</em></strong></p>';
        return parcel;
      },

      setCurrentMarker: function(marker){
        currentMarker = marker;
        return currentMarker;
      },

      getCurrentMarker: function(){
        return currentMarker;
      },
      
      getParcelsInView: function() {
        return parcelsInView
      },
      setParcelsInView: function(listOfParcels) {
        parcelsInView = listOfParcels;
        return parcelsInView;
      }
    };
  }]);

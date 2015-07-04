'use strict';

angular.module('urbinsight.services')
  .factory('QOLFactory', function ($http) {
    var qolSurvey = {};

    var currentMarker;

    return {
      getCurrentSurvey: function(){
        return qolSurvey;
      },

      setCurrentSurvey: function(survey){
        qolSurvey = survey;
        return qolSurvey;
      },

      resetCurrentSurvey: function(){
        qolSurvey = {};
        return qolSurvey;
      },

      setGeoCoordinates: function(latlngObject) {
        qolSurvey.geoCoordinates = [latlngObject.lat, latlngObject.lng];
        return qolSurvey;
      },

      saveCurrentSurvey: function(cityName, callback){
        var that = this;
        $http.post('/data/city/' + cityName + '/surveys/', {qol: that.getCurrentSurvey()}).
          success(function(data) {
            that.resetCurrentSurvey();
            callback(data);
          }).
          error(function() {

          });
      },

      fetchSurveys: function(cityName, callback) {
        $http.get('/data/city/' + cityName + '/surveys/').
          success(function(data){
            callback(data);
          }).
          error(function(){
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
'use strict';

angular.module('urbinsight.services', [])
 .factory('Cities', function($http) {
  var colors = {
    'source': '#9c89cc',
    'upstream' : '#7ec9b1',
    'demand'  : '#3ca0d3',
    'downstream' : '#fa946e',
    'sink' : '#f1f075'
  };

  var L = window.L;
  L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';

  return {
    fetchCity: function(cityName, callback){
      var request = $http.get('/data/city/' + cityName);
      request.success(function(data, status){
        return callback(data);
      });
    },

    createCity: function(cityName){
      var request = $http.post('/data/city/' + cityName);
      request.success(function(res, status){
        console.log('createcity ran in service');
      });
    },

    getNodes: function(cityName, callback){
      var request = $http.get('/data/label/' + cityName);
      request.success(function (data, status){
        return callback(data);
      });
    },

    allColors: function() {
      return colors;
    }

  };
 });
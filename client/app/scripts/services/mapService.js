'use strict';

angular.module('urbinsight.services')
  .factory('MapFactory', function ($http, $window) {
    var L;
    L = $window.L;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
    
    var map = L.mapbox.map('cityMap')

    return {
      getMap: function(){
        return map;
      }
    }
  });
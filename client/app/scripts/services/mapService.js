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
      },

      renderParcels: function(cityName){
        var that = this;
        $http.get('/data/city/' + cityName + '/parcels/').
          success(function(data, status, headers, config){
            data.forEach(function(datum){
              if(datum.describeParcel.parcelIdentification.geoCoordinates.length > 1){
                L.marker(datum.describeParcel.parcelIdentification.geoCoordinates, {
                  icon: L.mapbox.marker.icon({
                    'marker-size' : 'small',
                    'marker-color' : '#ff3366'
                  })
                }).addTo(map)
                  .bindPopup('<div class="parcelPopup">')
                  .openPopup();
              }
            })
          }).
          error(function(data, status, headers, config){

          });
      }
    }
  });
'use strict';

angular.module('urbinsight.services')
  .factory('MapFactory', function ($http, $window, UMISFactory) {
    var L;
    L = $window.L;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
    
    var map;

    return {
      getMap: function(){
        return map;
      },

      setMap: function(newMap){
        map = newMap;
        return map;
      },

      createMap: function(){
        map = L.mapbox.map('cityMap')
        return map;
      },

      renderParcels: function(cityName){
        var that = this;
        $http.get('/data/city/' + cityName + '/parcels/').
          success(function(data, status, headers, config){
            data.forEach(function(datum){
              if(datum.describeParcel.parcelIdentification.geoCoordinates.length > 1){
                var consumption = UMISFactory.totalConsumption(datum.workbooks.water, datum);
                L.marker(datum.describeParcel.parcelIdentification.geoCoordinates, {
                  icon: L.mapbox.marker.icon({
                    'marker-size' : 'small',
                    'marker-color' : '#ff3366'
                  })
                }).addTo(map)
                  .bindPopup("<div><p>Toilets: " + consumption.Toilets + "</p><br /><p>Hygiene: " + consumption.Hygiene + "</p><br /><p>Kitchen: " + consumption.Kitchen + "</p><br /><p>Laundry: " + consumption.Laundry + "</p><br /><p>Drinking: " + consumption.Drinking + "</p><br /><p>Surface Cleaning: " + consumption['Surface Cleaning'] + "</p><br /><p>Evaporative Cooling: " + consumption['Evaporative Cooling'] + "</p><br /><p>Water Customers: " + consumption['Water Customers'] + "</p><br /></div>")
                  .openPopup();
              }
            })
          }).
          error(function(data, status, headers, config){

          });
      }
    }
  });
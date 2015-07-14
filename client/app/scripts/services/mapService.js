'use strict';

angular.module('urbinsight.services')
  .factory('MapFactory', ['$http', '$window', 'UMISFactory', 'ParcelFactory', 'QOLFactory', function ($http, $window, UMISFactory, ParcelFactory, QOLFactory) {
    var L;
    L = $window.L;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
    
    var map;
    var currentMarker;

    return {
      getMap: function(){
        return map;
      },

      setMap: function(newMap){
        map = newMap;
        return map;
      },

      createMap: function(){
        map = L.mapbox.map('cityMap');
        return map;
      },

      setCurrentMarker: function(marker){
        currentMarker = marker;
        return currentMarker;
      },

      getCurrentMarker: function(){
        return currentMarker;
      },

      markerClickControl: function(objName, factory, $scope){
        var map = this.getMap();
        var marker = this.getCurrentMarker();
        var that = this;
        map.on('click', function(e) {
          if(map.hasLayer(marker)){
            map.removeLayer(marker);
          }
          $scope[objName] = factory.setGeoCoordinates(e.latlng);
           marker = L.marker(e.latlng, {
            icon: L.mapbox.marker.icon({
              'marker-size' : 'medium',
              'marker-color' : '#FFE11A'
            }),
            draggable: true
          });
          that.setCurrentMarker(marker);
          marker.addTo(map);
          marker.on('move', function (e) {
            $scope.parcel = factory.setGeoCoordinates(e.latlng);
          });
        });
      },

      removeCurrentMarker: function(){
        var map = this.getMap();
        map.removeLayer(this.getCurrentMarker());
      },

      renderParcels: function(cityName){
        var that = this;
        function drawing(data){
          data.forEach(function(datum){
            if(datum.describeParcel.parcelIdentification.geoCoordinates.length > 1){

              var consumption = UMISFactory.totalConsumption(datum.workbooks.water, datum);
              L.marker(datum.describeParcel.parcelIdentification.geoCoordinates, {
                icon: L.mapbox.marker.icon({
                  'marker-size' : 'small',
                  'marker-color' : '#ff3366'
                })
              }).addTo(that.getMap())
              // Turn the html below into a directive.
                .bindPopup('<div><h2 style="text-align: center;">Demand Summary - Water</h2><p>Toilets: ' + consumption.Toilets + '</p><br /><p>Hygiene: ' + consumption.Hygiene + '</p><br /><p>Kitchen: ' + consumption.Kitchen + '</p><br /><p>Laundry: ' + consumption.Laundry + '</p><br /><p>Drinking: ' + consumption.Drinking + '</p><br /><p>Surface Cleaning: ' + consumption['Surface Cleaning'] + '</p><br /><p>Evaporative Cooling: ' + consumption['Evaporative Cooling'] + '</p><br /><p>Water Customers: ' + consumption['Water Customers'] + '</p><br /><p><strong><em>Date Added: ' + datum.date + '</em></strong></p></div>');
            }
          });
        }
        ParcelFactory.fetchParcels(cityName, drawing);
      },

      renderSurveys: function(cityName){
        var that = this;
        function drawing(data){
          data.forEach(function(datum){
            if(datum.geoCoordinates.length> 1){
              L.marker(datum.geoCoordinates, {
                icon: L.mapbox.marker.icon({
                  'marker-size' : 'small',
                  'marker-color' : '#330099'
                })
              }).addTo(that.getMap())
                .bindPopup('<div style="max-height: 500px; overflow: scroll;"><h2 style="text-align: center;">Survey Response</h2><p style="margin: 0 0 0 0;">Employment: ' + datum.employment + '</p><br /><p style="margin: 0 0 0 0;">Healthcare: ' + datum.healthcare + '</p><br /><p style="margin: 0 0 0 0;">Family: ' + datum.family + '</p><br /><p style="margin: 0 0 0 0;">Stability: ' + datum.stability + '</p><br /><p style="margin: 0 0 0 0;">Relationships: ' + datum.relationships + '</p><br /><p style="margin: 0 0 0 0;">Recreation: ' + datum.recreation + '</p><br /><p style="margin: 0 0 0 0;">Education: ' + datum.education + '</p><br /><p style="margin: 0 0 0 0;">Vacation: ' + datum.vacation + '</p><br /><p style="margin: 0 0 0 0;">Housing: ' + datum.housing + '</p><br /><p style="margin: 0 0 0 0;">Environment: ' + datum.environment + '</p><br /><p style="margin: 0 0 0 0;">Discrimination: ' + datum.discrimination + '</p><br /><p style="margin: 0 0 0 0;">Religion: ' + datum.religion + '</p><br /><p style="margin: 0 0 0 0;">Mobility: ' + datum.mobility + '</p><br /><p style="margin: 0 0 0 0;">Movement: ' + datum.movement + '</p><br /><p style="margin: 0 0 0 0;">Safety: ' + datum.safety + '</p><br /><p style="margin: 0 0 0 0;">Governance: ' + datum.governance + '</p><br /><p><strong><em>Date Added: ' + datum.date + '</em></strong></p></div>');
            }
          });
        }
        QOLFactory.fetchSurveys(cityName, drawing);
      }
    };
  }]);
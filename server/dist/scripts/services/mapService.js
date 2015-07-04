'use strict';

angular.module('urbinsight.services')
  .factory('MapFactory', function ($http, $window, UMISFactory, ParcelFactory, QOLFactory) {
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
        map = L.mapbox.map('cityMap')
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
          };
          $scope[objName] = factory.setGeoCoordinates(e.latlng);
           marker = L.marker(e.latlng, {
            icon: L.mapbox.marker.icon({
              'marker-size' : 'medium',
              'marker-color' : '#FFE11A'
            }),
            draggable: true
          })
          that.setCurrentMarker(marker);
          marker.addTo(map)
          marker.on('move', function (e) {
            $scope.parcel = factory.setGeoCoordinates(e.latlng);
          })
        });
      },

      removeCurrentMarker: function(){
        var map = this.getMap()
        debugger;
        map.removeLayer(this.getCurrentMarker())
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
                .bindPopup("<div><h2 style='text-align: center'>Demand Summary - Water</h2><p>Toilets: " + consumption.Toilets + "</p><br /><p>Hygiene: " + consumption.Hygiene + "</p><br /><p>Kitchen: " + consumption.Kitchen + "</p><br /><p>Laundry: " + consumption.Laundry + "</p><br /><p>Drinking: " + consumption.Drinking + "</p><br /><p>Surface Cleaning: " + consumption['Surface Cleaning'] + "</p><br /><p>Evaporative Cooling: " + consumption['Evaporative Cooling'] + "</p><br /><p>Water Customers: " + consumption['Water Customers'] + "</p><br /><p><strong><em>Date Added: " + datum.date + "</em></strong></p></div>");
            }
          })
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
                  'marker-color' : '#F8F8F8'
                })
              }).addTo(that.getMap())
                .bindPopup("<h2>Survey Responses</h2><div><p><strong><em>Date Added: " + datum.date + "</em></strong></p></div>")
            }
          })
        }
        QOLFactory.fetchSurveys(cityName, drawing);
      }
    }
  });
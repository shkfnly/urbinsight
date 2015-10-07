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

      flipToLngLatArray: function(object){
        return [object.lng, object.lat];
      },

      currentGeoJSONBounds: null,

      transformBounds: function(boundsObject){
        var that = this;
        var SW, SE, NE, NW;
        SW = that.flipToLngLatArray(boundsObject.getSouthWest());
        SE = that.flipToLngLatArray(boundsObject.getSouthEast());
        NE = that.flipToLngLatArray(boundsObject.getNorthEast()); 
        NW = that.flipToLngLatArray(boundsObject.getNorthWest());

        that.currentGeoJSONBounds = [SW, SE, NE, NW, SW];
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

      renderLots: function(data){
        console.log(data);
      },

      renderParcels: function(cityName){
        var that = this;
        that.currentParcels = L.layerGroup([]);
        function drawing(data){
          data.forEach(function(datum){
            if(datum.describeParcel.parcelIdentification.geoCoordinates.length > 1){
              var mark = L.marker([datum.describeParcel.parcelIdentification.geoCoordinates[1], datum.describeParcel.parcelIdentification.geoCoordinates[0]], {
                icon: L.mapbox.marker.icon({
                  'marker-size' : 'small',
                  'marker-color' : '#ff3366'
                })
              });
              if(datum.popUp) {
                mark.bindPopup(datum.popUp);
              } else {
                mark.bindPopup(ParcelFactory.generateParcelPopUp(UMISFactory.calculateTotals(datum)).popUp);
              }
            that.currentParcels.addLayer(mark);
            }
          });
        that.currentParcels.addTo(that.getMap());
        }
        ParcelFactory.fetchParcels(cityName, drawing);
      },

      renderSurveys: function(cityName){
        var that = this;
        function drawing(data){
          data.forEach(function(datum){
            if(datum.geoCoordinates.length> 1){
              L.marker([datum.geoCoordinates[1], datum.geoCoordinates[0]], {
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

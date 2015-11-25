'use strict';

angular.module('urbinsight.services')
  .factory('MapFactory', ['$http', '$window', 'Cities', 'UMISFactory', 'ParcelFactory', 'QOLFactory', function ($http, $window, Cities, UMISFactory, ParcelFactory, QOLFactory) {
    var L;
    L = $window.L;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
    
    var map;
    var currentMarker;
    var city;

    return {
      gridLayers: [],
      gridControls: [],
      linesAdded: [],
      getCity: function(){
        return city
      },
      setCity: function(newCity){
       city = newCity; 
       return city;
      },
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
        var that = this;
        console.log(data);
        /*if(!(_.isEqual(data, {}))){
          L.geoJson(data, {
            style: function(feature) {
              return {color: '#0000FF'};
            }
          }).addTo(that.getMap());
        }*/
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
      },
      overlayAddCtrl: function(e){
        gridLayer = L.mapbox.gridLayer(e.layer._tilejson.id);
        this.getMap().addLayer(gridLayer);
        gridControl = L.mapbox.gridControl(gridLayer);
        this.getMap().addControl(gridControl);
      },
      overlayRmvCtrl: function(e){
        for (var i = 0; i < this.gridLayers.length; i++){
          if(this.gridLayers[i]._tilejson.id === e.layer._tilejson.id){
            this.getMap().removeLayer(this.gridLayers[i]);
            this.getMap()removeControl(this.gridControls[i]);
            this.gridLayers.splice(i, 1);
            this.gridControls.splice(i, 1);
            break;
          }
        }
      },
      additonalLayers = function(cityLayers){
        var first = true;
        var layers = {};
        angular.forEach(cityLayers, function(layer, name){
          if(first){
            layers[name] = L.mapbox.tileLayer(layer).addTo($scope.map);
            // Create a Grid Layer
            gridLayer = L.mapbox.gridLayer(layer);
            this.gridLayers.push(gridLayer);
            this.getMap().addLayer(gridLayer);
            // Create a Grid Control
            gridControl = L.mapbox.gridControl(gridLayer);
            this.gridControls.push(gridControl);
            this.getMap().addControl(gridControl);
            first = false;
          } else {
            layers[name] = L.mapbox.tileLayer(layer);
          }
        });
        return layers;
      },
      addLayerControl = function(addtLayers){
        var map = this.getMap();
        var firstHalf ='http://52.25.79.157/geoserver/wfs?request=GetFeature&typeName='
        var secondHalf = '&outputformat=json'
        if (cityName == 'abudhabi') {
         var abuDhabiLayerNames = ['parking', 'buildingplinth', 'buildingoverhang', 'buildingmiscconstruction', 'buildingcourtyard', 'building', 'plot', 'albateen_district', 'community', 'district'].reverse();
         var  addtLayers = {};
          _.forEach(abuDhabiLayerNames, function(layerName){
              addtLayers[layerName] = L.mapbox.featureLayer(null, {style: abuDhabiStyles.getStyle(layerName)}).loadURL(firstHalf + layerName + secondHalf).on('ready', function(layer){ this.eachLayer(function(polygon){
                /*var content = '';
                _.forEach(polygon.feature.properties, function(value, key){
                  content += key + ' : ' + value + '<br />'
                })*/
                polygon.bindPopup(polygon.feature.properties.PRIMARYU_1);
              });
            });
          });
          _.forEach(addtLayers, function(layer){
            layer.on('mouseover', function(e) {
              e.layer.openPopup();
            });
            layer.on('mouseout', function(e) {
              e.layer.closePopup();
            });
          });
        }
        
        L.control.layers({
          'Satellite Map' : L.mapbox.tileLayer('mapbox.streets-satellite'),
          'Streets Map' : L.mapbox.tileLayer('mapbox.streets').addTo($scope.map),
          'Urbinsight Map': L.mapbox.tileLayer('urbinsight.1114602d'),
          'Toner Map': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
          }),
          'Watercolor Map': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
          })
        },
        addtLayers
        ).addTo(map); 
      },
      
      renderMap: function(cityObj) {
        var map = this.getMap();
        var cityName = this.getCity();
        map = MapFactory.createMap()
        var featureGroup = L.featureGroup().addTo(map);
        this.addLayerControl(this.additonalLayers(cityObj.layers));
        // This is a test implementation of lots
        map.addLayer(lots);
        // Add events on map
        this.addMapEvents();
        map.setView([cityObj.lat, cityObj.lon], 12);
        window.map = map
      },

      addDrawEvents: function(){
        var drawControl = new L.Control.Draw({
          edit: {
          featureGroup: featureGroup
          }
        }).addTo(map);
        map.on('draw:created', function(e) {
          var type = e.layerType,
              layer = e.layer;
        });
        map.on('draw:created', function(e) {
          featureGroup.addLayer(e.layer);
        });
      },

      addMapEvents: function(){
        var map = this.getMap();
        map.on('overlayadd', this.overlayAddCtrl);
        map.on('overlayremove', this.overlayRmvCtrl);
        map.on('viewreset', function(e){
          var boundObj = e.target.getBounds();
          MapFactory.transformBounds(boundObj);
          ParcelFactory.fetchParcels(cityName, function(data){
            ParcelFactory.setParcelsInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
          QOLFactory.fetchSurveys(cityName, function(data){
            QOLFactory.setSurveysInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
        })
        map.on('moveend', function(e) {
          var boundObj = e.target.getBounds();
          this.transformBounds(boundObj);
          ParcelFactory.fetchParcels(cityName, function(data){
            ParcelFactory.setParcelsInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
          QOLFactory.fetchSurveys(cityName, function(data){
            QOLFactory.setSurveysInView(data);
          }, {params: {bounds: MapFactory.currentGeoJSONBounds, cityName: cityName}});
        });
      },
      renderNodes: function(data) {     
        var map = this.getMap();
        var that = this;
        var markers;
        angular.forEach(data, function(type, key){
          markers = new L.MarkerClusterGroup({
            iconCreateFunction: function(cluster) {
              return L.mapbox.marker.icon({
                'marker-symbol' : cluster.getChildCount(),
                'marker-color' : Cities.allColors()[key]
              });
            }
          });
          // '<p>Type: ' + key + '</p><p>Id: ' + node.id + '</p>'
          angular.forEach(type, function(node){
            var lat = parseFloat(node.lat);
            var lng = parseFloat(node.lng);
            var mark = L.marker([lat, lng], {
              icon: L.mapbox.marker.icon({
                'marker-size' : 'small',
                'marker-color' : Cities.allColors()[key]
              })
            }).bindPopup(that.popupgen(node, key))
            .on('click', function(){that.drawFlows(node);});
            if(markers) { markers.addLayer(mark); }
          });
          map.addLayer(markers);
        });
      },
      drawFlows: function(node) {
        var that = this;
        var map = this.getMap();
        var request = $http.get('/data/relation/' + node.id);
        request.success(function (data, status) {
         angular.forEach(this.linesAdded, function(line){
           map.removeLayer(line);
         });
         angular.forEach(data, function(relation){
           this.linesAdded.push(L.polyline(relation, {color: 'teal', opacity: 1, weight: 10}).addTo(map));
         });
        });
        request.error( function (data, status) {
        });
      },
      popupgen: function(node, type){
        var popupstring = '<div><h2 style="text-align: center;">Junction Information</h2><p>Stage: ' + type + '</p><br />';
        _.forEach(node, function(value, attrib){
          popupstring += '<p>' + attrib + ': ' + value + '</p><br />';
        });
        return popupstring + '</div>';
      }
    };
  }]);

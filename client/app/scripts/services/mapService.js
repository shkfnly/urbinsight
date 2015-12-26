'use strict';

angular.module('urbinsight.services')
  .factory('MapFactory', ['$http', '$window', 'Cities', 'UMISFactory', 'ParcelFactory', 'QOLFactory', 'abuDhabiStyles', function ($http, $window, Cities, UMISFactory, ParcelFactory, QOLFactory, abuDhabiStyles) {
    var L;
    L = $window.L;
    var mapboxgl;
    mapboxgl = $window.mapboxgl;
    L.mapbox.accessToken='pk.eyJ1IjoidXJiaW5zaWdodCIsImEiOiJIbG1xUDBBIn0.o2RgJkl1-wCO7yyG7Khlzg';
    mapboxgl.accessToken = 'pk.eyJ1IjoidGhpc3NheXNub3RoaW5nIiwiYSI6IjFNbHllT2MifQ.5F7AhW2FxnpENc8eiE-HUA';
    var map;
    var currentMarker;
    var city;

    return {
      gridLayers: [],
      gridControls: [],
      linesAdded: [],
      // Get and Set City actually return the name rather than the city object
      getCity: function(){
        return city;
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
        // map = L.mapbox.map('cityMap');
        map = new mapboxgl.Map({
          container: 'cityMap',
          style: 'mapbox://styles/mapbox/streets-v8',
          zoom: 12
        });
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
        var gridLayer = L.mapbox.gridLayer(e.layer._tilejson.id);
        this.getMap().addLayer(gridLayer);
        var gridControl = L.mapbox.gridControl(gridLayer);
        this.getMap().addControl(gridControl);
      },
      overlayRmvCtrl: function(e){
        for (var i = 0; i < this.gridLayers.length; i++){
          if(this.gridLayers[i]._tilejson.id === e.layer._tilejson.id){
            this.getMap().removeLayer(this.gridLayers[i]);
            this.getMap().removeControl(this.gridControls[i]);
            this.gridLayers.splice(i, 1);
            this.gridControls.splice(i, 1);
            break;
          }
        }
      },
      additonalLayers: function(cityLayers){
        var first = true;
        var layers = {};
        var that = this;
        angular.forEach(cityLayers, function(layer, name){
          if(first){
            layers[name] = L.mapbox.tileLayer(layer).addTo(map);
            // Create a Grid Layer
            var gridLayer = L.mapbox.gridLayer(layer);
            that.gridLayers.push(gridLayer);
            that.getMap().addLayer(gridLayer);
            // Create a Grid Control
            var gridControl = L.mapbox.gridControl(gridLayer);
            that.gridControls.push(gridControl);
            that.getMap().addControl(gridControl);
            first = false;
          } else {
            layers[name] = L.mapbox.tileLayer(layer);
          }
        });
        return layers;
      },
      addLayerControl: function(addtLayers){
        var map = this.getMap();
        var firstHalf ='http://52.25.79.157/geoserver/wfs?request=GetFeature&typeName=';
        var secondHalf = '&outputformat=json';
        if (this.cityName === 'abudhabi') {
         var abuDhabiLayerNames = ['parking', 'buildingplinth', 'buildingoverhang', 'buildingmiscconstruction', 'buildingcourtyard', 'building', 'plot', 'albateen_district', 'community', 'district'].reverse();
         addtLayers = addtLayers || {};
          angular.forEach(abuDhabiLayerNames, function(layerName){
              addtLayers[layerName] = L.mapbox.featureLayer(null, {style: abuDhabiStyles.getStyle(layerName)})
                                              .loadURL(firstHalf + layerName + secondHalf)
                                              .on('ready', function(){ this.eachLayer(function(polygon){ // could add layer
                /*var content = '';
                _.forEach(polygon.feature.properties, function(value, key){
                  content += key + ' : ' + value + '<br />'
                })*/
                polygon.bindPopup(polygon.feature.properties.PRIMARYU_1);
              });
            });
          });
          angular.forEach(addtLayers, function(layer){
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
          'Streets Map' : L.mapbox.tileLayer('mapbox.streets').addTo(map),
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
        var map = this.createMap();
        // this.addLayerControl(this.additonalLayers(cityObj.layers));
        // Add events on map
        // this.addMapEvents();
        // map.setView([cityObj.lat, cityObj.lon], 12);

        map.jumpTo({
          center: [cityObj.lon, cityObj.lat]
        });
        var city= this.getCity();
        map.addControl(new mapboxgl.Navigation({position: 'top-left'}));
        map.on('style.load', function(){
          map.addSource('parcels', {
            'type': 'vector',
            'tiles': ['http://localhost:5001/data/city/lots/' + city + '/{z}/{x}/{y}.pbf']
          });

          map.addLayer({
            'id': 'parcels-fill',
            'type': 'fill',
            'source': 'parcels',
            'interactive': true,
            'paint': {
              'fill-color': '#000000',
              'fill-opacity': 1.0
            }
            // 'paint.testing': {
            //   'fill-color': '#FF00FF'
            // }
          });
        });
        var groups = {
      'Land Cover': {
        visible: true,
        layers: [
          'landcover_snow',
          'landcover_crop',
          'landcover_grass',
          'landcover_scrub',
          'landcover_wood'
        ]
      },
      'Land Use': {
        visible: true,
        layers: [
          'landuse_snow',
          'landuse_crop',
          'landuse_grass',
          'landuse_scrub',
          'landuse_wood',
          'landuse_rock',
          'landuse_industrial',
          'landuse_school',
          'landuse_parking',
          'landuse_sand',
          'landuse_park',
          'landuse_pitch',
          'landuse_cemetery'
        ]
      },
      'Buildings': {
        visible: true,
        layers: [
          "building_shadow",
          "building"
        ]
      },
      'Roads': {
        'visible': true,
        layers: [
          "tunnel_path_bg",
          "tunnel_motorway_link_casing",
          "tunnel_service_casing",
          "tunnel_street_casing",
          "tunnel_main_casing",
          "tunnel_motorway_casing",
          "tunnel_motorway_link",
          "tunnel_service",
          "tunnel_street",
          "tunnel_main",
          "tunnel_motorway",
          "tunnel_major_rail",
          "tunnel_major_rail_hatching",
          "road_pedestrian",
          "road_motorway_link_casing",
          "road_service_casing",
          "road_street_casing",
          "road_main_casing",
          "road_motorway_casing_high",
          "road_motorway_link",
          "road_service",
          "road_street",
          "road_main",
          "road_motorway_casing_low",
          "road_motorway",
          "road_major_rail",
          "road_major_rail_hatching",
          "bridge_motorway_link_casing",
          "bridge_service_casing",
          "bridge_street_casing",
          "bridge_main_casing",
          "bridge_motorway_casing",
          "bridge_motorway_link",
          "bridge_service",
          "bridge_street",
          "bridge_main",
          "bridge_motorway",
          "bridge_aerialway_casing",
          "bridge_aerialway",
          "bridge_aerialway_hatching",
          "bridge_major_rail",
          "bridge_major_rail_hatching",
          "aeroway_runway",
          "aeroway_taxiway",
          "aeroway_fill",
          "road_label_1",
          "road_label_2",
          "road_label_3",
        ]
      },
      'Hillshade': {
        visible: true,
        layers: [
          "hillshade_highlight_bright",
          "hillshade_highlight_med",
          "hillshade_shadow_faint",
          "hillshade_shadow_med",
          "hillshade_shadow_dark",
          "hillshade_shadow_extreme"
        ]
      }
    };
    var ctrl = new mapboxgl.LayerControl({groups: groups});
    map.addControl(ctrl);

        // var simple = {
        //   'version': 1,
        //   'sources': {
        //     'parcels': {
        //       'type': 'vector',
        //       'tiles': ['http://localhost:5001/data/city/lots/' + this.getCity() + '/{z}/{x}/{y}.pbf'] 
        //     }
        //   }
        // }


        var lots = new L.TileLayer.MVTSource({
            url: '/data/city/lots/' + this.getCity() + '/{z}/{x}/{y}.pbf',
            clickableLayers: ['lots'],
            getIDForLayerFeature: function(feature) {
              return feature._id;
            },
            //takes a feature
            style: function() {
              return {
                color: 'rgba(255, 0, 0, 1)', 
                outline: { 
                   color: 'rgb(20,20,20)',
                   size: 1
                },
                selected: {
                   color: 'rgba(0, 255, 0, 1)'
                }
              };
            },
            layerOrdering: function(feature) {
              if (feature && feature.properties) {
                feature.properties.zIndex = 5;
              }
            }
        });
        // map.addLayer(lots);
        // lots.on('tileload', function(e){
        //   if (typeof e.target.layers.lots !== 'undefined'){
        //               e.target.layers.lots.bringToFront();
        //   }
        // });
        // lots.on('click', function(e){
        //   console.log('im the click');
        //   console.log(e);
        // });
        // var city = this.getCity();
        // map.on('click', function(e){
        //   $http.get('/data/city/lots/lot/' +  city, {params: {'lat': e.latlng.lat, 'lng': e.latlng.lng}});
        // });

        // (function(parcels, callback){
        //   map.addLayer(parcels);
        //   callback(parcels);
        // })(lots, function(param){
        //   param.layers['lots'].bringToFront();
        // });
      },

      addDrawEvents: function(){
        var featureGroup = L.featureGroup().addTo(map);
        new L.Control.Draw({
          edit: {
          featureGroup: featureGroup
          }
        }).addTo(map);
        map.on('draw:created', function() { // takes an e
          //var type = e.layerType,
           //   layer = e.layer;
        });
        map.on('draw:created', function(e) {
          featureGroup.addLayer(e.layer);
        });
      },

      addMapEvents: function(){
        var that = this;
        var map = this.getMap();
        var cityName = that.getCity();
        map.on('overlayadd', this.overlayAddCtrl.bind(this));
        map.on('overlayremove', this.overlayRmvCtrl.bind(this));
        map.on('viewreset', function(e){
          var boundObj = e.target.getBounds();
          that.transformBounds(boundObj);
          ParcelFactory.fetchParcels(cityName, function(data){
            ParcelFactory.setParcelsInView(data);
          }, {params: {bounds: that.currentGeoJSONBounds, cityName: cityName}});
          QOLFactory.fetchSurveys(cityName, function(data){
            QOLFactory.setSurveysInView(data);
          }, {params: {bounds: that.currentGeoJSONBounds, cityName: cityName}});
        });
        map.on('moveend', function(e) {
          var boundObj = e.target.getBounds();
          that.transformBounds(boundObj);
          ParcelFactory.fetchParcels(cityName, function(data){
            ParcelFactory.setParcelsInView(data);
          }, {params: {bounds: that.currentGeoJSONBounds, cityName: cityName}});
          QOLFactory.fetchSurveys(cityName, function(data){
            QOLFactory.setSurveysInView(data);
          }, {params: {bounds: that.currentGeoJSONBounds, cityName: cityName}});
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
        var map = this.getMap();
        var request = $http.get('/data/relation/' + node.id);
        request.success(function (data) {
         angular.forEach(this.linesAdded, function(line){
           map.removeLayer(line);
         });
         angular.forEach(data, function(relation){
           this.linesAdded.push(L.polyline(relation, {color: 'teal', opacity: 1, weight: 10}).addTo(map));
         });
        });
        request.error( function () {
        });
      },
      popupgen: function(node, type){
        var popupstring = '<div><h2 style="text-align: center;">Junction Information</h2><p>Stage: ' + type + '</p><br />';
        angular.forEach(node, function(value, attrib){
          popupstring += '<p>' + attrib + ': ' + value + '</p><br />';
        });
        return popupstring + '</div>';
      }
    };
  }]);

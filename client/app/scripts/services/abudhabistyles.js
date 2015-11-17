'use strict';

/**
 * @ngdoc service
 * @name urbinsight.abuDhabiStyles
 * @description
 * # abuDhabiStyles
 * Service in the urbinsight.
 */
angular.module('urbinsight')
  .service('abuDhabiStyles', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var styles = {};
      styles['parking'] = function(feature){
        if (feature.properties["ISSHELTERE"] === "Y"){
          return {
            "stroke": false,
            "color": "#46BD0D",
            "fillOpacity": 0.8
          }
        } else {
          return {
            "stroke": false,
            "color": "#FF530D",
            "fillOpacity": 0.8
          }
        }
      }
      styles['buildingplinth'] = function(feature){
        return {
          "stroke": false,
          "color": "#4EFFE5",
          "fillOpacity": 0.8
        }
      }
      styles['buildingoverhang'] = function(feature) {
        return {
          "stroke": false,
          "color": "#FF61A2",
          "fillOpacity": 0.8
        }
      }
      styles['buildingmiscconstruction'] = function(feature) {
        if (feature.properties['DESCRIPTIO'] === 'Utilities' ||
            feature.properties['DESCRIPTIO'] === 'Utility' || 
            feature.properties['DESCRIPTIO'] === 'Utility Other' || 
            feature.properties['DESCRIPTIO'] === 'Utilityother'  
            ) {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#E8E100"
          }
        }
        if (feature.properties['DESCRIPTIO'] == 'Seweragepumpstation') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#6B31E8"
          }
        }
        if (feature.properties['DESCRIPTIO'] == 'Waterpumpstation') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#1EB4FF"
          }
        } else {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#041924"
          }
        }
      }
      styles['building'] = function(feature){
        if (feature.properties['PRIMARYU_1'] === 'APARTMENT') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#e83820"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'BANK') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#85d1e6"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'CHURCH') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#d7a93d"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'CLUB') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#20d895"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'EMBASSY') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#441feb"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'GOVERNMENTAL') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#63e721"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'GRAVEYARD') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#dc2fa3"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'HEALTH') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#73c916"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'HEALTH CENTER') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#ecd840"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'HOSPITAL') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#ee3089"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'HOTEL') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#c8767c"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'IMAM HOUSE') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#4b88e4"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'INSTITUTE') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#65eda3"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'KINDERGARTEN') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#6dee8d"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'MARKET') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#b173e1"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'MINISTRY') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#5d5fe6"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'MOSQUE') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#79e080"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'OFFICE BUILDING') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#b4d367"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'PALACE') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#3c95d4"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'PETROL STATION') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#661eda"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'POST OFFICE') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#57d7db"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'POWER STATION') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#df2053"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'PUBLIC TOILET') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#e483e9"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'RESTAURANT') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#bf64da"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'SCHOOL') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#cb7926"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'SHOP') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#74d266"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'SUBSTATION') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#cfd86d"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'VILLA') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#ea76d9"
          }
        }
        if (feature.properties['PRIMARYU_1'] === 'WATER PUMPING STATION') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#173ccf"
          }
        } else {
         return {
          "fillOpacity": 0.0,
          "stroke": false
         }
        }
      }
      styles['plot'] = function(feature){
        if (feature.properties['STATUS'] === 'Constructed') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#8ecb4c"
          }
        } 
        if (feature.properties['STATUS'] === 'Not Constructed') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#e43d40"
          }
        } 
        if (feature.properties['STATUS'] === 'Under Construction') {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#852cdd"
          }
        } else { 
         return {
          "fillOpacity": 0.0,
          "stroke": false
         }
        }
      }
      styles['community'] = function(feature){
        if (feature.properties['POP_TOTAL'] > 1946) {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#08306b"
          }
        }
        if (feature.properties['POP_TOTAL'] > 1327) {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#2878b8"
          }
        }
        if (feature.properties['POP_TOTAL'] > 981) {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#72b2d7"
          }
        }
        if (feature.properties['POP_TOTAL'] > 890) {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#c7dcef"
          }
        }
        if (feature.properties['POP_TOTAL'] > 0) {
          return {
            "stroke": false,
            "fillOpacity": 0.8,
            "color": "#f7fbff"
          }
        }
      }
      return {
        getStyle: function(name){
          return styles[name];
        } 
      }
  });

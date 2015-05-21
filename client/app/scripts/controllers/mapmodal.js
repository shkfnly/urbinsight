'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:MapModalCtrl
 * @description
 * # MapModalCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('MapModalCtrl', function ($scope) {

//db.cities.update({name: 'medellin'}, {'$push': {'layerDefinitions': { $each:  [
    //   {'name': 'Ecocitizen Survey',
    //    'description': 'These data points represent how average citizens of Medellin feel about a range of issues. The questions are related to things such as economic opportunity and access to food. By clicking on each data point we are able to see the individual responses.',
    //    'attribution': 'Ecocity Builders'},
    //   {'name': 'Youth Population',
    //    'description': 'Youth population for each neighborhood in urban Medellin, Colombia. By clicking on each polygon it is possible to see data for previous years.',
    //    'attribution': 'Department of Planning (Medellin)'},
    //    {'name': 'Water System',
    //    'description': 'This map represents the fluvial system of Medellin, Colombia. It also has data points for the streams that are currently monitored as well as demonstration sites for watershed management.',
    //    'attribution': 'Department of the Environment'},
    //    {'name': 'Structural Axis of Public Spaces',
    //    'description': 'This line data represents the distribution of mobility systems within urban Medellin. These range from the road network and linear park, to pedestrian footpaths. Data Source: Department of Planning',
    //    'attribution': 'Department of Planning'},
    //    {'name': 'Social Development Zones',
    //    'description': 'These spatial datasets represent areas that have been identified by the government of Medellin as being central to social development. They range from education and recreation, to health and service corridors.',
    //    'attribution': 'Department of Planning'},
    //    {'name': 'Senior Population',
    //    'description': 'Senior Population for each neighborhood in urban Medellin, Colombia. By clicking on each polygon it is possible to see data for previous years.',
    //    'attribution': 'Department of Planning'},
    //    {'name': 'Major Roads and Transportation',
    //    'description': 'This map represents a detailed depiction of various transportation routes that exist within Medellin, Colombia. The data shows road hierarchies, bike routes and also railways. This allows analysis of spatial density and mobility.',
    //    'attribution': 'Department of Planning'},
    //    {'name': 'Residential Zoning',
    //    'description': 'This data (in m2) represents the amount of housing space that is zoned per lot in Medellin, Colombia. The gradient shows high density of housing available in the southern part of the city, with limited housing zoned in the other parts of the city. It is recommended to look at this data in relation to population density.',
    //    'attribution': 'Department of Planning'},
    //    {'name': 'Quality of Life',
    //    'description': 'Quality of Life Indicator as defined by the Medellin Government. These numbers are at the level of the Comuna and Corregimiento, which are administrative divisions of the city of Medellin. These numbers are not absolute but simply represent the scale within Medellin.',
    //    'attribution': 'Department of Planning (Medellin, 2012)'}

 //]}}});



    $('#plusclick').on('click', function(event){
      $('#plusclick').toggleClass('opened');
      $('#mapModal').toggleClass('hoveredon');
      $('#modalbar').toggleClass('shown');
    });

  });

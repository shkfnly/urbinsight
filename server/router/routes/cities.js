var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../../database').db
var City = require('../../database').cities


router.post('/:city_name', function (req, res, next) {
  var medellin = new City({name: 'medellin', 
               lat: '6.2491',
               lon: '-75.5891',
               layers: {'Quality of Life' : 'thissaysnothing.y3cy2e29',
                 'Geological Classification' : 'thissaysnothing.Layers',
                 'Heart Disease per 100,000' : 'thissaysnothing.pjznz5mi',
                 'Youth Population Change' : 'thissaysnothing.youth_population',
                 'Youth Population Nominal' : 'thissaysnothing.8w06yldi',
                 'Nominal Senior Population' : 'thissaysnothing.senior_population',
                 'Water System' : 'thissaysnothing.water_system',
                 'Structural Axes of Public Spaces' : 'thissaysnothing.46q7iudi',
                 'Green Infrastructure' : 'thissaysnothing.5i0e8kt9'},
               layerDefinitions: [
                {'name': 'Ecocitizen Survey',
                 'description': 'These data points represent how average citizens of Medellin feel about a range of issues. The questions are related to things such as economic opportunity and access to food. By clicking on each data point we are able to see the individual responses.',
                 'attribution': 'Ecocity Builders'},
                {'name': 'Youth Population',
                 'description': 'Youth population for each neighborhood in urban Medellin, Colombia. By clicking on each polygon it is possible to see data for previous years.',
                 'attribution': 'Department of Planning (Medellin)'},
                 {'name': 'Water System',
                 'description': 'This map represents the fluvial system of Medellin, Colombia. It also has data points for the streams that are currently monitored as well as demonstration sites for watershed management.',
                 'attribution': 'Department of the Environment'},
                 {'name': 'Structural Axis of Public Spaces',
                 'description': 'This line data represents the distribution of mobility systems within urban Medellin. These range from the road network and linear park, to pedestrian footpaths. Data Source: Department of Planning',
                 'attribution': 'Department of Planning'},
                 {'name': 'Social Development Zones',
                 'description': 'These spatial datasets represent areas that have been identified by the government of Medellin as being central to social development. They range from education and recreation, to health and service corridors.',
                 'attribution': 'Department of Planning'},
                 {'name': 'Senior Population',
                 'description': 'Senior Population for each neighborhood in urban Medellin, Colombia. By clicking on each polygon it is possible to see data for previous years.',
                 'attribution': 'Department of Planning'},
                 {'name': 'Major Roads and Transportation',
                 'description': 'This map represents a detailed depiction of various transportation routes that exist within Medellin, Colombia. The data shows road hierarchies, bike routes and also railways. This allows analysis of spatial density and mobility.',
                 'attribution': 'Department of Planning'},
                 {'name': 'Residential Zoning',
                 'description': 'This data (in m2) represents the amount of housing space that is zoned per lot in Medellin, Colombia. The gradient shows high density of housing available in the southern part of the city, with limited housing zoned in the other parts of the city. It is recommended to look at this data in relation to population density.',
                 'attribution': 'Department of Planning'},
                 {'name': 'Quality of Life',
                 'description': 'Quality of Life Indicator as defined by the Medellin Government. These numbers are at the level of the Comuna and Corregimiento, which are administrative divisions of the city of Medellin. These numbers are not absolute but simply represent the scale within Medellin.',
                 'attribution': 'Department of Planning (Medellin, 2012)'}
               ]
              })
  medellin.save(function (err, city) {
    res.send(city)
  });
})

router.get('/:city_name', function (req, res, next) {
  var cityName = req.params.city_name;
  City.findOne({ name : cityName }, function (err, city_result){
    if (err) {
      console.log('There has been and error');
      console.log(err)
    }
    res.send(city_result)
  });
});

module.exports = router;
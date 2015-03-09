var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../../database').db
var City = require('../../database').cities


// router.post('/:city_name', function (req, res, next) {
//   City.update({name: 'vancouver'}, {layerDefinitions: [] }, function(){console.log('done')})
//   var cairo = new City({name: 'cairo', 
//                lat: '30.0600',
//                lon: '31.2333',
//                layers: {
//                  'Water Quality' : 'urbinsight.cairowaterquality',
//                  'Parcel Audit' : 'urbinsight.cairoparcelaudit',
//                  'Air Quality'  : 'urbinsight.cairoairquality',
//                  'Unemployment Rate' : 'urbinsight.cairolaborpop',
//                  'Marital Rate' : 'urbinsight.cairomaritalpopulation',
//                  'School Enrollment Rate' : 'urbinsight.cairoschoolpop',
//                  'Youth Population Percentage' : 'urbinsight.youthpopforcairo',
//                  'Total Population' : 'urbinsight.cairototalpopulation',
//                  }
//               })
//   var casa = new City({name: 'casablanca',
//                        lat: '33.5333',
//                        lon: '-7.5833'
//                      })
//   var lima = new City({name: 'lima',
//                        lat: '-12.0433',
//                        lon: '-77.0283'})
//   cairo.save();
//   casa.save();
//   lima.save();
// })

router.get('/:city_name', function (req, res, next) {
  var cityName = req.params.city_name;
  City.find(function(err, cities){
    console.log(cities)
  })
  City.findOne({ name : cityName }, function (err, city_result){
    if (err) {
      console.log('There has been and error');
      console.log(err)
    }
    res.send(city_result)
  });
});

module.exports = router;
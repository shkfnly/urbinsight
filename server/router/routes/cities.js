var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../../database').db
var City = require('../../database').cities


router.post('/:city_name', function (req, res, next) {
  //    var vancouver = new City({name: 'vancouver',
  //            lat: '49.2496600',
  //            lon: '-123.1193400',
  //            layers: {'Water Mains' : 'urbinsight.vanWaterNetwork',
  //                     'Sources' : 'urbinsight.vancouverwatersources',
  //                     'Upstream' : 'urbinsight.vanupstream',
  //                     'Parcels' : 'urbinsight.qmfmkj4i',
  //                     'Downstream' : 'urbinsight.vandownstream',
  //                     'Sinks' : 'urbinsight.larr7ldi'}
  //          })
  //     var medellin = new City({name: 'medellin',
  //            lat: '6.2491',
  //            lon: '-75.5891',
  //            layers: {'Quality of Life' : 'thissaysnothing.y3cy2e29',
  //                     'Geological Classification' : 'thissaysnothing.Layers',
  //                     'Heart Disease per 100,000' : 'thissaysnothing.pjznz5mi',
  //                     'Youth Population Change' : 'thissaysnothing.youth_population',
  //                     'Youth Population Nominal' : 'thissaysnothing.8w06yldi',
  //                     'Nominal Senior Population' : 'thissaysnothing.senior_population',
  //                     'Water System' : 'thissaysnothing.water_system',
  //                     'Structural Axes of Public Spaces' : 'thissaysnothing.46q7iudi',
  //                     'Green Infrastructure' : 'thissaysnothing.5i0e8kt9'}
  //          })
  // var cairo = new City({name: 'cairo', 
  //              lat: '30.0600',
  //              lon: '31.2333',
  //              layers: {
  //                'Water Quality' : 'urbinsight.cairowaterquality',
  //                'Parcel Audit' : 'urbinsight.cairoparcelaudit',
  //                'Air Quality'  : 'urbinsight.cairoairquality',
  //                'Unemployment Rate' : 'urbinsight.cairolaborpop',
  //                'Marital Rate' : 'urbinsight.cairomaritalpopulation',
  //                'School Enrollment Rate' : 'urbinsight.cairoschoolpop',
  //                'Youth Population Percentage' : 'urbinsight.youthpopforcairo',
  //                'Total Population' : 'urbinsight.cairototalpopulation',
  //                }
  //             })
  //  var casa = new City({name: 'casablanca',
  //                      lat: '33.5333',
  //                      lon: '-7.5833'
  //                    })
  //  var lima = new City({name: 'lima',
  //                      lat: '-12.0433',
  //                      lon: '-77.0283'})
  //  cairo.save();
  //  casa.save();
  //  lima.save();
  //  medellin.save();
  //  vancouver.save();
  //  console.log('create city ran in router')
 })

router.get('/:city_name', function (req, res, next) {
  var cityName = req.params.city_name;
  console.log('yeah')
  City.findOne({ name : cityName }, function (err, city_result){
    if (err) {
      console.log('There has been and error');
      console.log(err)
    }
    res.send(city_result)
  });
});



module.exports = router;

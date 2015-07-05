var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../../database').db
var City = require('../../database').cities


router.post('/:city_name', function (req, res, next) {

});

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

var express = require('express');
var router = express.Router();
var db = require('../../database').db
var Parcel = require('../../database').parcels


router.post('/', function (req, res, next) {
  var parcel = new Parcel(req.body.parcel)
  parcel.save(function (err, parcel){
    if (err) return console.error(err);
    console.log(parcel);
    res.send(parcel);
  });
})

router.get('/', function (req, res, next){

})
module.exports = router;



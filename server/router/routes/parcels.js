var express = require('express');
var router = express.Router();
var db = require('../../database').db
var Parcel = require('../../database').parcels


router.post('/', function (req, res, next) {
  var parcel = new Parcel(req.body.parcel)
  parcel.save(function (err, parcel){
    if (err) return console.error(err);
    res.send(parcel);
  });
})

router.get('/', function (req, res, next){
  Parcel.find({}, function (err, docs){
    if (err) return console.error(err);
    res.send(docs);
  })

})
module.exports = router;



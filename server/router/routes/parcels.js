var express = require('express');
var router = express.Router();
var db = require('../../database').db;
var Parcel = require('../../database').parcels;


router.post('/', function (req, res, next) {
  var parcel = new Parcel(req.body.parcel);
  parcel.save(function (err, parcel){
    if (err) return console.error(err);
    res.send(parcel);
  });
});

router.get('/', function (req, res, next){
  if(req.query.bounds){
  	var point1 = JSON.parse(req.query.bounds[0]);
  	var point2 = JSON.parse(req.query.bounds[1]);
  	var point3 = JSON.parse(req.query.bounds[2]);
  	var point4 = JSON.parse(req.query.bounds[3]);
  	var point5 = JSON.parse(req.query.bounds[4]);
  	Parcel.find({'describeParcel.parcelIdentification.geoCoordinates' :
  		{ $geoWithin : 
  			{ $geometry : 
  				{ type: "Polygon",
  				  coordinates: [[point1, point2, point3, point4, point5]]
  				}
  			}
  		}
  	}, function (err, docs){
  		if (err) return console.error(err);
  		res.send(docs);
  	});
  } else {
	Parcel.find({}, function (err, docs){
	    if (err) return console.error(err);
	    res.send(docs);
	});
  }
});

module.exports = router;



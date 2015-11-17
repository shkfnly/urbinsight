var express = require('express');
var router = express.Router();
var db = require('../../database').db;
var QOL = require('../../database').qol;

router.post('/', function (req, res, next) {
  var qol = new QOL(req.body.qol);
  qol.save(function (err, survey){
    if (err) return console.error(err);
    res.send(survey);
  });
});

router.get('/', function (req, res, next){
  if(req.query.bounds) {
    var point1 = JSON.parse(req.query.bounds[0]);
    var point2 = JSON.parse(req.query.bounds[1]);
    var point3 = JSON.parse(req.query.bounds[2]);
    var point4 = JSON.parse(req.query.bounds[3]);
    var point5 = JSON.parse(req.query.bounds[4]);
    QOL.find({'geoCoordinates' : 
      { $geoWithin:
        { $geometry:
          { type: "Polygon",
            coordinates: [[point1, point2, point3, point4, point5]]
          }
        }
      }
    }, function (err, surveys){
        if (err) return console.error(err);
          res.send(surveys);
    });
  } else {
    QOL.find({}, function (err, docs){
      if (err) return console.error(err);
      res.send(docs);
    });
  }
});


module.exports = router;


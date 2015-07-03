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
})

router.get('/', function (req, res, next){
  QOL.find({}, function (err, surveys){
    if (err) return console.error(err);
    console.log(surveys);
    res.send(surveys);
  })
})

module.exports = router;
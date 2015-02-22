var express = require('express');
var router = express.Router();
var _ = require('underscore');
var db = require('../../database').nodeDB
var nodeTypes = ['source', 'upstream', 'demand', 'downstream', 'sink'];

router.get('/:label', function(req, res, next) { 
  var count = 0;
  var newResults = {};
  var label = req.params.label;
  _.each(nodeTypes, function(type){
    db.find({city: label}, true, type, function(err, results) {
      count++;
      newResults[type] = results;
      if(count > 4){
        res.send(newResults);
      }
    });
  })

});

module.exports = router;
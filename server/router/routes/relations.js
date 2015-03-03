var express = require('express');
var router = express.Router();
var url = require('url');
var _ = require('underscore');
var db = require('../../database').nodeDB;
var async = require('async')


var addRelations = function(node_id, res){
  
  // Read the first node from the database
  db.read(node_id, function(err, initNode){
    var queue = [[initNode, 'out'], [initNode, 'in']];
    var relations = [];
    // Create a While loop to implement depth first search
    async.whilst(
      function () { 
        return queue.length > 0},
      function (callback) {
        var NodeandDir = queue.shift();
        var node = NodeandDir[0]
        var dir = NodeandDir[1];
        // Lookup the relationships for the node in each direction
        db.relationships(node.id, dir, 'flows_to', function(err, relationships){
          //iterate through the relationships
          _.each(relationships, function(relation){
            var node2id;
            relation.start === node.id ? node2id = relation.end : node2id = relation.start
            //read the other endpoint
            db.read(node2id, function(err, node2){
              // push the coordinates to relations
              relations.push([[parseFloat(node.lat), parseFloat(node.lng)], [parseFloat(node2.lat), parseFloat(node2.lng)]])
              //add the new node to the queue with the relationships
              queue.push([node2, dir])
            })
          })
          callback(err)
        })
      },
      function(err){
        console.log('Final Relations');
        console.log(relations);
        res.send(relations);
      }
    )
  })
}

router.get('/:id', function(req, res, next) {
  var node_id = req.params.id;
  addRelations(node_id, res);
});




module.exports = router;
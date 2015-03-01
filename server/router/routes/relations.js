var express = require('express');
var router = express.Router();
var url = require('url');
var _ = require('underscore');
var db = require('../../database').nodeDB;


var addRelations = function(node_id){
  var queue = [[node_id, 'out'], [node_id, 'in']];
  var relations = [];
  db.read(node_id, function(err, initNode){
    while (queue.length > 0){
      var IDandDir = queue.shift();
      var id = IDandDir[0];
      var dir = IDandDir[1];
      db.read(id, function(err, node){
        db.relationships(node.id, dir, 'flows_to', function(err, relationships){
          if(relationships.length === 0 && queue.length === 0){
            return relations;
          }
          _.each(relationships, function(relation){
            var node2id;
            relation.start === node.id ? node2id = relation.end : node2id = relation.start
            db.read(node2id, function(err, node2){
              relations.push([[node.lat, node.lng], [node2.lat, node2.lng]])
              console.log("Relations")
              console.log(relations)
              queue.push([node2, dir])
              console.log("queue")
              console.log(queue)
            })
          })
        })
      })
    }
  })
}

var flowMap;
router.get('/:id', function(req, res, next) {
  var node_id = req.params.id;
  flowMap = addRelations(node_id);
  console.log(flowMap)
  next();
},
function(req, res, next) {
  res.send(flowMap);
});
  // var queue = [[node_id, 'out'], [node_id, 'in']];
  // var relations = [];
  // while (queue.length > 0){
  //   var IDandDir = queue.shift();
  //   var ID = IDandDir[0];
  //   var Dir = IDandDir[1];
  //   // Get the data of the clicked node from the database
  //   db.read(ID, function(err, node){
  //     // Get the relationships of the node in the right direction
  //     db.relationships(node.id, Dir, 'flows_to', function(err, relationships){
  //       // If the relationships length if === 0 and there are no nodes in queue the send the response
  //       if(relationships.length === 0 && queue.length === 0){
  //         console.log(relations);
  //         res.send(relations[0]);
  //       }
  //       _.each(relationships, function(relation){
  //         var node2id;
  //         relation.start === node.id ? node2id = relation.end : node2id = relation.start
  //         db.read(node2id, function(err, node2){
  //           relations.push([[node.lat, node.lng], [node2.lat, node2.lng]]);
  //           queue.push([node2.id, Dir])
  //         })
  //       })
  //     })
  //   })
  // }

  // db.relationships(node_id, direction, function(err, relationships){
  //   res.send(relationships);
  // });



module.exports = router;
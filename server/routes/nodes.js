var express = require('express');
var router = express.Router();

router.get('/data/relations', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var node_id = url_parts['query']['node_index'];
  var direction = url_parts['query']['direction'];

  db.relationships(node_id, direction, function(err, relationships){
    res.send(relationships);
  });
});

router.get('/data/infoByNode', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var node_id = url_parts['query']['node_index'];

  db.read(node_id, function(err, node) {
    res.send(node);
  });
});

router.get('/data/infoByLabel', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var label = url_parts['query']['label'];

  db.nodesWithLabel(label, function(err, results) {
    res.send(results);
  });
});

module.exports = router;
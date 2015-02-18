var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var node_id = url_parts['query']['id'];
  var direction = url_parts['query']['direction'];

  db.relationships(node_id, direction, function(err, relationships){
    res.send(relationships);
  });
});


module.exports = router;
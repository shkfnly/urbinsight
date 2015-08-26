var express = require('express');
var router = express.Router();
var url = require('url')

router.get('/:id', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var node_id = url_parts['query']['id'];

  db.read(node_id, function(err, node) {
    res.send(node);
  });
});

module.exports = router;
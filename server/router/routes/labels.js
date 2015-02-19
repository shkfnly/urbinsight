var express = require('express');
var router = express.Router();
var url = require('url')

router.get('/:label', function(req, res, next) {
  var url_parts = url.parse(req.url, true);
  var label = url_parts['query']['label'];

  db.nodesWithLabel(label, function(err, results) {
    res.send(results);
  });
});

module.exports = router;
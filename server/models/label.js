var express = require('express');
var router = express.Router();

// This goes in a labels router needs a model
// router.get('/data/infoByLabel', function(req, res, next) {
//   var url_parts = url.parse(req.url, true);
//   var label = url_parts['query']['label'];

//   db.nodesWithLabel(label, function(err, results) {
//     res.send(results);
//   });
// });

module.exports = router;
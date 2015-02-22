// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('*', function(req, res, next) {
//   res.render('index', { title: 'urbinsight' });
// });

// module.exports = router;
 /**
  * The Index of Routes
  */

module.exports = function (app) {

  // The signup route
  app.use('/signup', require('./routes/signup'));

  // User Route
  app.use('/users', require('./routes/users'));

  // Node Route
  app.use('/nodes', require('./routes/nodes'));

  // Relation Route
  app.use('/relation', require('./routes/relations'));

  // Label Route
  app.use('/data/label', require('./routes/labels'));

  // Dashboard Route
  // app.use('/dashboard', require('.routes/dashboard'));
}
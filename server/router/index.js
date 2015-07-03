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

  // The login route
  app.use('/login', require('./routes/auth'))

  // User Route
  app.use('/users', require('./routes/users'));

  // Node Route
  app.use('/nodes', require('./routes/nodes'));

  // Relation Route
  app.use('/data/relation', require('./routes/relations'));

  // Label Route
  app.use('/data/label', require('./routes/labels'));

  // City Route
  app.use('/data/city', require('./routes/cities'));

  // Parcel Route
  app.use('/data/city/:city_name/parcels', require('./routes/parcels.js'));

  // QOL-Survey Route
  app.use('/data/city/:city_name/surveys', require('./routes/qol.js'));

  //D3 Route
  app.use('/data/d3', require('./routes/d3'));
}
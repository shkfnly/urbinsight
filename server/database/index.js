
/**
  * Database Interface
*/
var mongoose = require('mongoose');
// Schemas export models
var UserModel = require('./schemas/user')
var CityModel = require('./schemas/city')
var ParcelModel = require('./schemas/parcel')
var QOLModel = require('./schemas/qol_survey')
// Connections
var developmentDb = 'mongodb://localhost/urbinsight';
var productionDb = ' mongodb://heroku_app34283988:j6vcu0oo4229gsd581rm7u2meo@ds043991.mongolab.com:43991/heroku_app34283988'
var developmentGraphDb = 'http://localhost:7474'
var productionGraphDb = 'http://app34283988:WhOYge9xK8B8QrmgFB7J@app34283988.sb02.stations.graphenedb.com:24789'
var usedDb;
var nodeDB;

// If we're in development...
if (process.env.NODE_ENV === 'development') {
  // set our database to the development one
  usedDb = developmentDb;
  nodeDB = require("seraph")({  server: 'http://localhost:7474',
                                endpoint: '/db/data',
                                user: 'neo4j',
                                pass: 'password'});
  // connect to it via mongoose
  mongoose.connect(usedDb);
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
  // set our database to the production one
  usedDb = productionDb;
  nodeDB = require("seraph")(productionGraphDb);
  console.log(nodeDB)
  // connect to it via mongoose
  mongoose.connect(usedDb);
}

// get an instance of our connection to our database
var db = mongoose.connection;

// Logs that the connection has successfully been opened
db.on('error', console.error.bind(console, 'connection error:'));
// Open the connection
db.once('open', function callback () {
  console.log('Database Connection Successfully Opened at '
              + usedDb);
});



// if(process.env['GRAPHENEDB_URL']){
//   var nodeDB = require("seraph")(process.env['GRAPHENEDB_URL'])
// }
// else{
//   var nodeDB = require("seraph")('http://localhost:7474')
// }


nodeDB.save({ name: "Test-Man", age: 40 }, 'Person', function(err, node) {
  if (err) {
    console.log(err)
    console.log(node);
  };
  console.log("Test-Man inserted.");

  nodeDB.delete(node, function(err) {
    if (err) console.log(err);
    console.log("Test-Man away!");
  });
});


exports.nodeDB = nodeDB;
exports.db = db;
exports.users = UserModel;
exports.cities = CityModel;
exports.parcels = ParcelModel;
exports.qol = QOLModel;
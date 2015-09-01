
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
var productionDb = process.env.MONGOLAB_URI;
var developmentGraphDb = 'http://localhost:7474';
var productionGraphDb = process.env.GRAPHENEDB_URL;
var nodeDB;
var pg = require('pg');
var conString =  process.env.CONNECT_STRING || "postgres://shokishoki:shadow1@localhost/urbinsight-data";

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
  // connect to it via mongoose
  mongoose.connect(usedDb, {user: process.env.MONGODB_USER, pass: process.env.MONGODB_PASS});
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


// nodeDB.save({ name: "Test-Man", age: 40 }, 'Person', function(err, node) {
//   if (err) {
//     console.log(err)
//     console.log(node);
//   };
//   console.log("Test-Man inserted.");

//   nodeDB.delete(node, function(err) {
//     if (err) console.log(err);
//     console.log("Test-Man away!");
//   });
// });


exports.nodeDB = nodeDB;
exports.db = db;
exports.conString = conString;
exports.users = UserModel;
exports.cities = CityModel;
exports.parcels = ParcelModel;
exports.qol = QOLModel;

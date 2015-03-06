
/**
  * Database Interface
*/

var mongoose = require('mongoose');
// Schemas export models
var UserModel = require('./schemas/user')


// Connections
var developmentDb = 'mongodb://localhost/test';
var productionDb = 'ADD THIS HERE'
var usedDb;

// If we're in development...
if (process.env.NODE_ENV === 'development') {
  // set our database to the development one
  usedDb = developmentDb;
  // connect to it via mongoose
  mongoose.connect(usedDb);
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
  // set our database to the production one
  usedDb = productionDb;
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



if(process.env['GRAPHENEDB_URL']){
  var nodeDB = require("seraph")(process.env['GRAPHENEDB_URL'])
}
else{
  var nodeDB = require("seraph")('http://localhost:7474')
}


// nodeDB.save({ name: "Test-Man", age: 40 }, function(err, node) {
//   if (err) throw err;
//   console.log("Test-Man inserted.");

//   nodeDB.delete(node, function(err) {
//     if (err) throw err;
//     console.log("Test-Man away!");
//   });
// });


exports.nodeDB = nodeDB;
exports.db = db;
exports.users = UserModel;

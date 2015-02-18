// grab the seraph-model module
var db = require("../config/db").db;
var model = require("seraph-model");
var Node = model(db, 'Node');

Node.schema = {
  lat: { type: Float},
  lng: { type: Float}
}

// define a source model
// module.exports allows us to pass this to other files
module.exports = Node;
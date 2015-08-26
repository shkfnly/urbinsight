//Refer to label heading and requires
var db = require("../index").db;
var model = require("seraph-model");
var Node = model(db, 'Node');

Node.schema = {
  lat: { type: Number, required: true},
  lon: { type: Number, required: true}
}

// define a source model
// module.exports allows us to pass this to other files
module.exports = Node;
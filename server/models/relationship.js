var db = require("../config/db").db;
var model = require("seraph-model");
var Relation = model(db, 'Relation');

Relation.schema = {
  lat: { type: Float},
  lng: { type: Float}
}

module.exports = Relation;
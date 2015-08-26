//Refer to label heading and requires
var db = require("../index").db;
var model = require("seraph-model");
var Relation = model(db, 'Relation');

Relation.schema = {
  lat: { type: Number},
  lon: { type: Number}
}

module.exports = Relation;

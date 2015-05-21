/**
  *Schema for Cities
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
  name: { type: String, required: true},
  lat: { type: String, required: true},
  lon: { type: String, required: true},
  layers: {},
  layerDefinitions: []
})

var City = mongoose.model('City', citySchema);

module.exports = City;



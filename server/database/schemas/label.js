var database = require('../../database').db
var db = database.db;
var model = require("seraph-model");

// Schema example
// var User = model(db, 'User');

// User.schema = {
//   username: { type: String, required: true},
//   email: { type: String, required: true},
//   password: { type: String, required: true },
//   profile: {}
// }
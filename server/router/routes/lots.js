var express = require('express');
var router = express.Router();
var conString = require('../../database').conString;
var pg = require('pg');





router.get('/', function(req, res, next){
  if(req.query.bounds){

    var point1 = JSON.parse(req.query.bounds[0]);
    var point2 = JSON.parse(req.query.bounds[1]);
    var point3 = JSON.parse(req.query.bounds[2]);
    var point4 = JSON.parse(req.query.bounds[3]);
    var point5 = JSON.parse(req.query.bounds[4]);
    var cityName = req.query.cityName;
    pg.connect(conString, function(err, client, done){
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query("select row_to_json(fc) from (select 'FeatureCollection' as type, array_to_json(array_agg(f)) as features from (select 'Feature' as type, st_asgeojson(lg.wkb_geometry)::json as geometry, row_to_json((select l from (select tags) as l )) as properties from budapest as lg where st_contains(ST_GeometryFromText('POLYGON((" + point1[0] + " " + point1[1] + ", " + point2[0] + " " + point2[1] + ", " + point3[0] + " " + point3[1] + ", " + point4[0] + " " + point4[1] + ", " + point5[0] + " " + point5[1] + "))', 4326), wkb_geometry)) as f) as fc", function(err, result) {
        if(err) {
          return console.error('error running query', err);
        }
        res.send(result.rows[0].row_to_json);
      });
    });
  } else {
    res.send({});
  }
});

module.exports = router;

// select st_asgeojson(wkb_geometry) as feature from budapest where ST_CONTAINS(ST_GeometryFromText('POLYGON((18.96137237548828 47.402299753699616, 19.186248779296875 47.402299753699616, 19.186248779296875 47.58069447747099, 18.96137237548828 47.58069447747099, 18.96137237548828 47.402299753699616))', 4326), wkb_geometry);
// select st_asgeojson(wkb_geometry) as feature from budapest where ST_Contains(ST_GeometryFromText('POLYGON((18.964462280273438 47.40880590168841, 19.264869689941406 47.40880590168841, 19.264869689941406 47.58717856130284, 18.964462280273438 47.58717856130284, 18.964462280273438 47.40880590168841))', 4326), wkb_geometry);

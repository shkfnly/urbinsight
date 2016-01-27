var express = require('express');
var router = express.Router();
var pgClient = require('../../database').pgClient;
var conString = require('../../database').conString;
var pg = require('pg');
var geojsonvt = require('geojson-vt');
var SphericalMercator = require('sphericalmercator');
var mapnik = require('mapnik');
var zlib = require('zlib');
var VectorTile = require('vector-tile').VectorTile;
var Protobuf = require('pbf');
mapnik.register_default_fonts();
mapnik.register_default_input_plugins();

var mercator = new SphericalMercator({
  size: 512
});

router.get('/:city_name/:z/:x/:y.pbf', function(req, res) {

  var city_name = req.params.city_name;
  var bbox = mercator.bbox(
      +req.params.x,
      +req.params.y,
      +req.params.z,
      false,
      '4326'
      );

  pg.connect(conString, function(err, client, done){
    var config_object = {
      'medellin' : {
        'attributes': ['cobama', 'subtipo_lote', 'tipo_lote', 'estrato', 'zona', 'usopredial', 'npisos', 'calificacion']
      },
      'lima' : {
        'attributes': ['objectid', 'id_lote', 'tip_uso', 'id_dist', 'estado']
      },
      'budapest': {
        'attributes': ['id', 'tags']
      }
    };
    var handleError = function(err) {
      // no error occurred, continue with the request
      if(!err) return false;

      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      if(client){
        done(client);
      }
      console.log("i'm the error");
      console.log(err);
      // res.writeHead(500, {'content-type': 'text/plain'});
      // res.end('An error occurred');
      return true;
    };

    // handle an error from the connection
    if(handleError(err)) return;
    if(city_name === 'medellin' || city_name === 'lima' || city_name === 'budapest'){
    client.query("SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.wkb_geometry)::json As geometry, row_to_json((SELECT l FROM (SELECT " + config_object[city_name]['attributes'].join(', ') + " ) As l )) As properties FROM " + city_name + "_parcels As lg WHERE st_intersects(lg.wkb_geometry, st_makeenvelope(" + bbox.toString() + ", 4326) ) ) As f )  As fc", function(err, result){
      if (err) {
        console.log("error in the query");
        return console.error('error running query', err);
      }
      // handle an error from the connection
      if(handleError(err)) return;

      var vtile = new mapnik.VectorTile(+req.params.z, +req.params.x, +req.params.y);
      if( (typeof result.rows[0] !== 'undefined')  && (result.rows[0].row_to_json.features !== null )){
          try {

            vtile.addGeoJSON(JSON.stringify(result.rows[0].row_to_json), 'lots');
          } catch (e) {
            console.log("came back with an error");
            console.log(e);
          }
      }
      res.setHeader('Content-Encoding', 'deflate');
      res.setHeader('Content-Type', 'application/x-protobuf');
      zlib.deflate(vtile.getData(), function(err, pbf) {
        done();
        // res.writeHead(200);
        res.send(pbf);
      });    
    });
    }
  });
});

router.get('/lot/:city_name/', function(req, res){
  client.query("select * from " + city_name + "-parcels WHERE ST_CONTAINS(wkb_geometry, ST_SetSRID(ST_MakePoint(" + req.query.lng + 
    "," + req.query.lat + "), 4326)", function(err, result){
    if (err){
      console.log('there has been an error');
    }
    console.log(result);
    res.sendStatus(200);
  });
});

module.exports = router;
// "select st_asgeojson(wkb_geometry) as feature from budapest2 where st_intersects(wkb_geometry, st_makeenvelope(" +
// bbox.toString() + ", 4326)) LIMIT 1", function(err, result){
// select st_asgeojson(wkb_geometry) as feature from budapest where ST_CONTAINS(ST_GeometryFromText('POLYGON((18.96137237548828 47.402299753699616, 19.186248779296875 47.402299753699616, 19.186248779296875 47.58069447747099, 18.96137237548828 47.58069447747099, 18.96137237548828 47.402299753699616))', 4326), wkb_geometry);
// select st_asgeojson(wkb_geometry) as feature from budapest where ST_Contains(ST_GeometryFromText('POLYGON((18.964462280273438 47.40880590168841, 19.264869689941406 47.40880590168841, 19.264869689941406 47.58717856130284, 18.964462280273438 47.58717856130284, 18.964462280273438 47.40880590168841))', 4326), wkb_geometry)

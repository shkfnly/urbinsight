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
// module.exports = Node;
// var query = '[out:json][timeout:100000];(node["building"(47.390214775423416,18.897857666015625,47.62444645776709,19.259376525878906);way["building"(47.390214775423416,18.897857666015625,47.62444645776709,19.259376525878906);relation["building"(47.390214775423416,18.897857666015625,47.62444645776709,19.259376525878906););out body;>;out skel qt;'
// var ws = fs.createWriteStream("/Users/ashokafinley/development/urbinsight/budapest_buildings4.txt")
// qo(query, function(error,data){ 
//     if(error){
//       return console.log(error);
//     }
//     fs.writeFile("/Users/ashokafinley/development/urbinsight/budapest_buildings5.geojson", data);
//     console.log('file was saved')
//   }
// )

// var query2 = '[out:json][timeout:25];(node["building"](47.500213508743514,19.05052363872528,47.503873756032114,19.055421352386475);way["building"](47.500213508743514,19.05052363872528,47.503873756032114,19.055421352386475);relation["building"](47.500213508743514,19.05052363872528,47.503873756032114,19.055421352386475););out body;>;out skel qt;'
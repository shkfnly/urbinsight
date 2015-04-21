// 'use strict';

// angular.module('urbinsight.directives', ['urbinsight.services'])
//   .directive('pieCharting', ['d3Service', '$document' , function(d3Service, $document){
//     return {
//       restrict: 'EA',
//       scope: {},
//       link: function(scope, element, attrs){
//         d3Service.d3().then(function(d3) {
//             var width = parseInt(attrs.width) || 200,
//                 height = parseInt(attrs.height) || 200,
//             radius = Math.min(width, height) / 2,
//             color = d3.scale.category10();

//             var svg = d3.select('#viz').append("svg")
//                       .attr("width", width)
//                       .attr("height", height)
//                       //What is append g here for.
//                     .append("g")
//                       .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
//             window.onresize = function (argument) {
//               scope.$apply();
//               // body...
//             }

//             scope.$watch(function() {
//               return angular.element(document.querySelector( '#viz')).innerWidth}, function() {
//                 scope.fetchData(scope.render);
//             });

//             scope.render = function(error, root) {
//                var path = svg.datum(root).selectAll("path")
//                   .data(partition.nodes)
//                 .enter().append("path")
//                   .attr("display", function(d) { return d.depth ? null: "none"; }) //hide inner ring
//                   .attr("d", arc)
//                   .style("stroke", "#fff")
//                   .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
//                   .style("fill-rule", "evenodd")
//                   .each(stash);
//               d3.selectAll("input").on("change", function change() {
//                 var value = this.value === "count"
//                     ? function() { return 1; }
//                     : function(d) { return d.size; };

//                 path
//                     .data(partition.value(value).nodes)
//                   .transition()
//                     .duration(1500)
//                     .attrTween("d", arcTween);
//               });
//             };

//             $scope.fetchData = function(callback){
//               d3.json('https://gist.githubusercontent.com/shkfnly/2da4667e9f654be9dfd0/raw/1e5746ae751bff323a8831a105f25fec3577b9fa/testdata.json', function(error, root){
//                 callback(error, root);
//               })
//             }
//           //What does this partition do.
//             var partition = d3.layout.partition()
//                 .sort(null)
//                 .size([2 * Math.PI, radius * radius])
//                 .value(function(d) { return 1; });

//             var arc = d3.svg.arc()
//                 .startAngle(function(d) {return d.x; })
//                 .endAngle(function(d) {return d.x + d.dx; })
//                 .innerRadius(function(d) { return Math.sqrt(d.y); })
//                 .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
//             // d3.json('https://gist.githubusercontent.com/shkfnly/2da4667e9f654be9dfd0/raw/1e5746ae751bff323a8831a105f25fec3577b9fa/testdata.json', function(error, root) {
//             //   console.log(root);
//             //   var path = svg.datum(root).selectAll("path")
//             //       .data(partition.nodes)
//             //     .enter().append("path")
//             //       .attr("display", function(d) { return d.depth ? null: "none"; }) //hide inner ring
//             //       .attr("d", arc)
//             //       .style("stroke", "#fff")
//             //       .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
//             //       .style("fill-rule", "evenodd")
//             //       .each(stash);
//             //   d3.selectAll("input").on("change", function change() {
//             //     var value = this.value === "count"
//             //         ? function() { return 1; }
//             //         : function(d) { return d.size; };

//             //     path
//             //         .data(partition.value(value).nodes)
//             //       .transition()
//             //         .duration(1500)
//             //         .attrTween("d", arcTween);
//             //   });
//             // });

//             var stash = function(d) {
//               d.x0 = d.x;
//               d.dx0 = d.dx;
//             }

//             var arcTween = function(a){
//               var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
//               return function(t) {
//                 var b = i(t);
//                 a.x0 = b.x;
//                 a.dx0 = b.dx;
//                 return arc(b);
//               };
//             }

//             d3.select(self.frameElement).style("height", height + "px");
//         });
//       }};
//   }]);
// 'use strict';

// angular.module('urbinsight.directives', ['urbinsight.services'])
//   .directive('pieChart', function() {
//     var width = 200,
//     height = 200,
//     radius = Math.min(width, height) / 2,
//     color = d3.scale.category10();

//   return {
//     restrict: 'E',
//     scope: {
//       val: '=',
//       grouped: '='
//     },
//     link: function (scope, element, attrs) {
//       var svg = d3.select('#viz').append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             //What is append g here for.
//           .append("g")
//             .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");

//       scope.$watch('val', function (newVal, oldVal) {
//         svg.selectAll('*').remove();

//         if (!newVal) {
//           return;
//         }

//         var partition = d3.layout.partition()
//             .sort(null)
//             .size([2 * Math.PI, radius * radius])
//             .value(function(d) { return 1; });

//         var arc = d3.svg.arc()
//             .startAngle(function(d) {return d.x; })
//             .endAngle(function(d) {return d.x + d.dx; })
//             .innerRadius(function(d) { return Math.sqrt(d.y); })
//             .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });
//         var path = svg.datum(data).selectAll("path")
//             .data(partition.nodes)
//           .enter().append("path")
//             .attr("display", function(d) { return d.depth ? null: "none"; }) //hide inner ring
//             .attr("d", arc)
//             .style("stroke", "#fff")
//             .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
//             .style("fill-rule", "evenodd")
//             .each(stash);
//         d3.selectAll("input").on("change", function change() {
//           var value = this.value === "count"
//               ? function() { return 1; }
//               : function(d) { return d.size; };

//           path
//               .data(partition.value(value).nodes)
//             .transition()
//               .duration(1500)
//               .attrTween("d", arcTween);
//         });

//         function stash(d) {
//           d.x0 = d.x;
//           d.dx0 = d.dx;
//         }

//         function arcTween(a){
//           var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
//           return function(t) {
//             var b = i(t);
//             a.x0 = b.x;
//             a.dx0 = b.dx;
//             return arc(b);
//           };
//         }

//         d3.select(self.frameElement).style("height", height + "px");
//       })
//     }
//   }
// })
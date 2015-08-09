'use strict';
angular.module('urbinsight.directives')
.directive('umisResource', ['ParcelFactory', function(ParcelFactory) {
        var data;
        var updateLine;
        var renderLine = function(data, resource){
          var margin = {top: 20, right: 80, bottom: 30, left: 50},
              width = 430 - margin.left - margin.right,
              height = 250 - margin.top - margin.bottom;

          var parseDate = d3.time.format('%Y%m%d').parse;

          var x = d3.time.scale()
              .range([0, width]);

          var y = d3.scale.linear()
              .range([height, 0]);

          var color = d3.scale.category10();

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom');

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient('left');

          var line = d3.svg.line()
              .interpolate('basis')
              .x(function(d) { return x(d.date); })
              .y(function(d) { return y(d.temperature); });
          var selectID = '#line-' + resource.toString();
          var svg = d3.select(selectID).append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));

            data.forEach(function(d) {
              d.date = parseDate(d.date);
            });

            var cities = color.domain().map(function(name) {
              return {
                name: name,
                values: data.map(function(d) {
                  return {date: d.date, temperature: +d[name]};
                })
              };
            });

            x.domain(d3.extent(data, function(d) { return d.date; }));

            y.domain([
              d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
              d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
            ]);

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            svg.append('g')
                .attr('class', 'y axis')
                .call(yAxis)
              .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 6)
                .attr('dy', '.71em')
                .style('text-anchor', 'end')
                .text('Temperature (ºF)');

            var city = svg.selectAll('.city')
                .data(cities)
              .enter().append('g')
                .attr('class', 'city');

            city.append('path')
                .attr('class', 'line')
                .attr('d', function(d) { return line(d.values); })
                .style('stroke', function(d) { return color(d.name); });

            city.append('text')
                .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                .attr('transform', function(d) { return 'translate(' + x(d.value.date) + ',' + y(d.value.temperature) + ')'; })
                .attr('x', 3)
                .attr('dy', '.35em')
                .text(function(d) { return d.name; });

                



        };
        var updateLine = function(data, resource){
          var margin = {top: 20, right: 80, bottom: 30, left: 50},
              width = 430 - margin.left - margin.right,
              height = 250 - margin.top - margin.bottom;
                  var selectString = '#line-' + resource;
                  var svg = d3.select(selectString).select('svg');
                  var x = d3.time.scale()
                      .range([0, width]);

                  var y = d3.scale.linear()
                      .range([height, 0]);
                  
                  var parseDate = d3.time.format('%Y%m%d').parse;
                  var xAxis = d3.svg.axis()
                      .scale(x)
                      .orient('bottom');

                  var yAxis = d3.svg.axis()
                      .scale(y)
                      .orient('left');

                  var line = d3.svg.line()
                      .interpolate('basis')
                      .x(function(d) { return x(d.date); })
                      .y(function(d) { return y(d.temperature); });



                  var color = d3.scale.category10();
                  color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'date'; }));

                    data.forEach(function(d) {
                      d.date = parseDate(d.date);
                    });

                    var cities = color.domain().map(function(name) {
                      return {
                        name: name,
                        values: data.map(function(d) {
                          return {date: d.date, temperature: +d[name]};
                        })
                      };
                    });

                    x.domain(d3.extent(data, function(d) { return d.date; }));

                    y.domain([
                      d3.min(cities, function(c) { return d3.min(c.values, function(v) { return v.temperature; }); }),
                      d3.max(cities, function(c) { return d3.max(c.values, function(v) { return v.temperature; }); })
                    ]);

                    svg.selectAll('.x.axis')
                        .call(xAxis);
                    svg.selectAll('.y.axis')
                        .call(yAxis)
                      .append('text')
                        .attr('transform', 'rotate(-90)')
                        .attr('y', 6)
                        .attr('dy', '.71em')
                        .style('text-anchor', 'end')
                        .text('Temperature (ºF)');

                    var city = svg.selectAll('.city')
                        .data(cities);

                    city.enter().append('g')
                        .attr('class', 'city');

                    city.append('path')
                        .attr('class', 'line')
                        .attr('d', function(d) { return line(d.values); })
                        .style('stroke', function(d) { return color(d.name); });

                    city.append('text')
                        .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
                        .attr('transform', function(d) { return 'translate(' + x(d.value.date) + ',' + y(d.value.temperature) + ')'; })
                        .attr('x', 3)
                        .attr('dy', '.35em')
                        .text(function(d) { return d.name; });
                    city.exit().remove();
                };

        

   //      var renderPie = function(root) {
   //                var stash = function(d) {
   //                             d.x0 = d.x;
   //                             d.dx0 = d.dx;
   //                           };
   //                var arcTween = function(a){
   //                  var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
   //                  return function(t) {
   //                    var b = i(t);
   //                    a.x0 = b.x;
   //                    a.dx0 = b.dx;
   //                    return arc(b);
   //                  };
   //                };
   //                var width = 200,
   //                height = 200,
   //                radius = Math.min(width, height) / 2,
   //                color = d3.scale.category10();
   //                var svg = d3.select('#viz').append('svg')
   //                          .attr('width', width)
   //                          .attr('height', height)
   //                          .append('g')
   //                          .attr('transform', 'translate(' + width / 2 + ',' + height * .52 + ')');

   //                 var partition = d3.layout.partition()
   //                  .sort(null)
   //                  .size([2 * Math.PI, radius * radius])
   //                  .value(function(d) { return 1; });

   //                  var arc = d3.svg.arc()
   //                  .startAngle(function(d) {return d.x; })
   //                  .endAngle(function(d) {return d.x + d.dx; })
   //                  .innerRadius(function(d) { return Math.sqrt(d.y); })
   //                  .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

   //                 var path = svg.datum(root).selectAll('path')
   //                    .data(partition.nodes)
   //                  .enter().append('path')
   //                    .attr('display', function(d) { return d.depth ? null: 'none'; }) //hide inner ring
   //                    .attr('d', arc)
   //                    .style('stroke', '#fff')
   //                    .style('fill', function(d) { return color((d.children ? d : d.parent).name); })
   //                    .style('fill-rule', 'evenodd')
   //                    .each(stash);
   //                // d3.selectAll('input').on('change', function change() {
   //                //   var value = this.value === 'count'
   //                //       ? function() { return 1; }
   //                //       : function(d) { return d.size; };

   //                //   path
   // //       .data(partition.value(value).nodes)
   //                //     .transition()
   //                //       .duration(1500)
   //                //       .attrTween('d', arcTween);
   //                // });
   //              d3.select(self.frameElement).style('height', height + 'px');
   //              };
   var renderPie = function(data, resource){
    var resourceData = data[resource];
    data = d3.entries()
      var width = 500,
          height = 500,
          radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
          .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { 
            return d.value; });


      var selectID = '#pie-' + resource.toString();
      var svg = d3.select(selectID)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      var g = svg.selectAll('.arc')
          .data(pie(data))
        .enter().append('g')
          .attr('class', 'arc');

          g.append('path')
          .attr('d', arc)
          .style('fill', function(d) { return color(d.data.key); });

      g.append('text')
            .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text(function(d) { return d.data.key; });
      } ;

  var updatePie = function(data, resource){
    var resourceData = data[resource];
    data = d3.entries(resourceData);
      var width = 500,
          height = 500,
          radius = Math.min(width, height) / 2;

      // var color = d3.scale.ordinal()
      //     .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
      var color = d3.scale.category10()
      var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

      var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) { return d.value; });
      var selectID = '#pie-' + resource.toString();
      var svg = d3.select(selectID).select('svg').select('g');
      var g = svg.selectAll('.arc')
          .data(pie(data))

      g.enter().append('g')
          .attr('class', 'arc');
      g.append('path')
          .attr('d', arc)
          .style('fill', function(d) { 
            return color(d.data.key); });

      // g.append('text')
      //       .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
      //       .attr('x', 12)
      //       .attr('dy', '1em')
      //       .style('text-anchor', 'start')
      //       .text(function(d) { return d.data.key + '( ' + d.data.value + ' )'; });
      svg.append('g').attr('id', 'labels')

      var labels = svg.select('#labels')
      var enteringLabels = labels.selectAll('.label').data(pie(data)).enter()
      var labelGroups = enteringLabels.append('g').attr('class', 'label');
      labelGroups.append('circle').attr({
        x: 0, y: 0, r: 2, fill: '#000',
        transform: function(d, i) {
          var centroid = arc.centroid(d);
          return 'translate(' + centroid + ')';

        }, 'class': 'label-circle'
      });

      var textLines = labelGroups.append("line").attr({
        x1: function (d, i) {
            return arc.centroid(d)[0];
        },
        y1: function (d, i) {
            return arc.centroid(d)[1];
        },
        x2: function (d, i) {
            var centroid = arc.centroid(d);
            var midAngle = Math.atan2(centroid[1], centroid[0]);
            var x = Math.cos(midAngle) * 175;
            return x;
        },
        y2: function (d, i) {
            var centroid = arc.centroid(d);
            var midAngle = Math.atan2(centroid[1], centroid[0]);
            var y = Math.sin(midAngle) * 175;
            return y;
        },
            'class': 'label-line'
      });
      var textLabels = labelGroups.append("text").attr({
          x: function (d, i) {
              var centroid = arc.centroid(d);
              var midAngle = Math.atan2(centroid[1], centroid[0]);
              var x = Math.cos(midAngle) * 175;
              var sign = (x > 0) ? 1 : -1
              var labelX = x + (5 * sign)
              return labelX;
          },
          y: function (d, i) {
              var centroid = arc.centroid(d);
              var midAngle = Math.atan2(centroid[1], centroid[0]);
              var y = Math.sin(midAngle) * 175;
              return y;
          },
              'text-anchor': function (d, i) {
              var centroid = arc.centroid(d);
              var midAngle = Math.atan2(centroid[1], centroid[0]);
              var x = Math.cos(midAngle) * 175;
              return (x > 0) ? "start" : "end";
          },
              'class': 'label-text'
      }).text(function (d) {
          return d.data.key + '( ' + d.data.value + ' )';
      });
      var alpha = 0.5;
      var spacing = 12;
      function relax() {
          var again = false;
          textLabels.each(function (d, i) {
              var a = this;
              var da = d3.select(a);
              var y1 = da.attr("y");
              textLabels.each(function (d, j) {
                  var b = this;
                  // a & b are the same element and don't collide.
                  if (a == b) return;
                  var db = d3.select(b);
                  // a & b are on opposite sides of the chart and
                  // don't collide
                  if (da.attr("text-anchor") != db.attr("text-anchor")) return;
                  // Now let's calculate the distance between
                  // these elements. 
                  var y2 = db.attr("y");
                  var deltaY = y1 - y2;
                  
                  // Our spacing is greater than our specified spacing,
                  // so they don't collide.
                  if (Math.abs(deltaY) > spacing) return;
                  
                  // If the labels collide, we'll push each 
                  // of the two labels up and down a little bit.
                  again = true;
                  var sign = deltaY > 0 ? 1 : -1;
                  var adjust = sign * alpha;
                  da.attr("y",+y1 + adjust);
                  db.attr("y",+y2 - adjust);
              });
          });
          // Adjust our line leaders here
          // so that they follow the labels. 
          if(again) {
              var labelElements = textLabels[0];
              textLines.attr("y2",function(d,i) {
                  var labelForLine = d3.select(labelElements[i]);
                  return labelForLine.attr("y");
              });
              setTimeout(relax,20)
          }
      }
      relax();



      g.exit().remove();
  };



      var fetchPieData = function(resourceUrl){
              d3.json(resourceUrl, function(error, root){
                data = root;
                renderPie(root);
              });
            };
      var fetchLineData = function(resourceUrl, resource, callback){
       d3.tsv(resourceUrl, function(error, data){
         data = data;
         callback(data, resource);
       });
      };




    
    var urlLine = 'https://gist.githubusercontent.com/shkfnly/9ad173c4c972024521ec/raw/c4e8fc0369683d2706eebcaa28c75ff1a9206883/testdata.tsv';
    // fetchPieData('https://gist.githubusercontent.com/shkfnly/2da4667e9f654be9dfd0/raw/1e5746ae751bff323a8831a105f25fec3577b9fa/testdata.json');
    function link(scope, element, attrs){
      element.children('#pie')[0].id = ('pie-' + scope.resource);
      // element.children('#line')[0].id = ('line-' + scope.resource);
      // fetchLineData(urlLine, scope.resource, renderLine);
      renderPie(scope.info, scope.resource);
      scope.$watch('info', function(newVal, oldVal, scope){
        // fetchLineData(urlLine, scope.resource, updateLine);
        updatePie(newVal, scope.resource);
        scope.info = newVal;

      }, true);
    }



  
  return {
    restrict: 'E',
    scope: {
      info: '=',
      resource: '=',
      parcels: '='
    },
    link: link,
    transclude: true,
    templateUrl: 'views/cities/umisResource.html'
  };
}]);

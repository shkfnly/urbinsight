'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:UmisresourceCtrl
 * @description
 * # UmisresourceCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('umisResourceCtrl', function ($scope, $stateParams) {

        $scope.renderLine = function(data){
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

          var svg = d3.select('#line').append('svg')
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

        $scope.renderPie = function(root) {
                  var stash = function(d) {
                               d.x0 = d.x;
                               d.dx0 = d.dx;
                             };
                  var arcTween = function(a){
                    var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
                    return function(t) {
                      var b = i(t);
                      a.x0 = b.x;
                      a.dx0 = b.dx;
                      return arc(b);
                    };
                  };
                  var width = 200,
                  height = 200,
                  radius = Math.min(width, height) / 2,
                  color = d3.scale.category10();
                  var svg = d3.select('#viz').append('svg')
                            .attr('width', width)
                            .attr('height', height)
                            .append('g')
                            .attr('transform', 'translate(' + width / 2 + ',' + height * .52 + ')');

                   var partition = d3.layout.partition()
                    .sort(null)
                    .size([2 * Math.PI, radius * radius])
                    .value(function(d) { return 1; });

                    var arc = d3.svg.arc()
                    .startAngle(function(d) {return d.x; })
                    .endAngle(function(d) {return d.x + d.dx; })
                    .innerRadius(function(d) { return Math.sqrt(d.y); })
                    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

                   var path = svg.datum(root).selectAll('path')
                      .data(partition.nodes)
                    .enter().append('path')
                      .attr('display', function(d) { return d.depth ? null: 'none'; }) //hide inner ring
                      .attr('d', arc)
                      .style('stroke', '#fff')
                      .style('fill', function(d) { return color((d.children ? d : d.parent).name); })
                      .style('fill-rule', 'evenodd')
                      .each(stash);
                  // d3.selectAll('input').on('change', function change() {
                  //   var value = this.value === 'count'
                  //       ? function() { return 1; }
                  //       : function(d) { return d.size; };

                  //   path
                  //       .data(partition.value(value).nodes)
                  //     .transition()
                  //       .duration(1500)
                  //       .attrTween('d', arcTween);
                  // });
                d3.select(self.frameElement).style('height', height + 'px');
                };

      $scope.fetchPieData = function(resourceUrl){
              d3.json(resourceUrl, function(error, root){
                $scope.data = root;
                $scope.renderPie(root);
              });
            };
      $scope.fetchLineData = function(resourceUrl){
       d3.tsv(resourceUrl, function(error, data){
         $scope.data = data;
         $scope.renderLine(data);
       });
      };
    $scope.fetchLineData('https://gist.githubusercontent.com/shkfnly/9ad173c4c972024521ec/raw/c4e8fc0369683d2706eebcaa28c75ff1a9206883/testdata.tsv'); 
    $scope.fetchPieData('https://gist.githubusercontent.com/shkfnly/2da4667e9f654be9dfd0/raw/1e5746ae751bff323a8831a105f25fec3577b9fa/testdata.json');
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';
angular.module('urbinsight.directives')
.directive('umisResource', ['ParcelFactory', '$window', function(ParcelFactory, $window) {
  var d3 = $window.d3;

  var width = 600,
      height = 500,
      radius = Math.min(width, height) / 3,
      color = d3.scale.category10(),
      arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(0),
      outerArc = d3.svg.arc()
                  .innerRadius(radius * 0.9)
                  .outerRadius(radius * 0.9),
      pie = d3.layout.pie().sort(null).value(function(d) { return d.value; });

  var svg;

  var mergeWithFirstEqualZero = function(first, second){
    var secondSet = d3.set(); second.forEach(function(d) { 
      secondSet.add(d.key); });
    var onlyFirst = first
      .filter(function(d){ return !secondSet.has(d.key); })
      .map(function(d) { return { key: d.key, value: 0 }; });
    return d3.merge([ second, onlyFirst ])
             .sort(null);
  };

  var updatePieChart = function(newData, oldData) {
    if(typeof oldData === 'undefined'){oldData = newData;}
    var duration = 1000;
    var data0 = svg.select('.slices').selectAll('path.slice')
                   .data()
                   .map(function(d){ return d.data; });
    if (data0.length === 0) { data0 = newData; }
    var was = mergeWithFirstEqualZero(newData, oldData);
    var is = mergeWithFirstEqualZero(data0, newData);

    var slice = svg.select('.slices').selectAll('path.slice')
        .data(pie(was));
    slice.enter()
         .insert('path')
         .attr('class', 'slice')
         .style('fill', function(d) { return color(d.data.key); })
         .each(function(d) {
          this._current = d;
         });
    slice = svg.select('.slices').selectAll('path.slice')
        .data(pie(is));

    slice
      .transition().duration(duration)
      .attrTween('d', function(d) {
        var interpolate = d3.interpolate(this._current, d);
        var _this = this;
        return function(t) {
          _this._current = interpolate(t);
          return arc(_this._current);
        };
      });

      slice = svg.select('.slices').selectAll('path.slice')
        .data(pie(newData));

      slice
        .exit().transition().delay(duration).duration(0)
        .remove();

    /* ------ TEXT LABELS ------- */

    var text = svg.select('.labels').selectAll('text')
      .data(pie(was));

    text.enter()
      .append('text')
      .attr('dy', '.35em')
      .style('opacity', 0)
      .text(function(d) {
        return d.data.key + ': ' + d.data.value.toFixed(2);
      })
      .each(function(d) {
        this._current = d;
      });

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    text = svg.select('.labels').selectAll('text')
      .data(pie(is));
    text.transition().duration(duration)
      .style('opacity', function(d) {
        return d.data.value === 0 ? 0 : 1;
      })
      .attrTween('transform', function(d) {
        var interpolate = d3.interpolate(this._current, d);
        var _this  = this;
        return function(t) {
          var d2 = interpolate(t);
          _this._current = d2;
          var pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return 'translate(' + pos + ')';
        };
      })
      .styleTween('text-anchor', function(d){
        var interpolate = d3.interpolate(this._current, d);
        return function(t) {
          var d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? 'start' : 'end';
        };
      });

    text = svg.select('.labels').selectAll('text')
      .data(pie(newData));

    text
      .exit().transition().delay(duration)
      .remove();

    /* ------- SLICE TO TEXT POLYLINES --------*/
    var polyline = svg.select('.lines').selectAll('polyline')
      .data(pie(was));

    polyline.enter()
      .append('polyline')
      .style('opacity', 0)
      .each(function(d) {
        this._current = d;
      });

    polyline = svg.select('.lines').selectAll('polyline')
      .data(pie(is));

    polyline.transition().duration(duration)
      .style('opacity', function(d) {
        return d.data.value === 0 ? 0 : 0.5;
      })
      .attrTween('points', function(d){
        this._current = this._current;
        var interpolate = d3.interpolate(this._current, d);
        var _this = this;
        return function(t) {
          var d2 = interpolate(t);
          _this._current = d2;
          var pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };
      });

    polyline = svg.select('.lines').selectAll('polyline')
      .data(pie(newData));

    polyline
      .exit().transition().delay(duration)
      .remove();

    var textLabels = svg.select('.labels').selectAll('text');
    var textLines = svg.select('.lines').selectAll('polyline');
    var alpha = 0.5;
    var spacing = 12;
    function relax() {
        var again = false;
        textLabels.each(function (d, i) {
            debugger;
            var a = this;
            var da = d3.select(a);
            var y1 = da.attr('y');
            textLabels.each(function (d, j) {
                var b = this;
                // a & b are the same element and don't collide.
                if (a === b) return;
                var db = d3.select(b);
                // a & b are on opposite sides of the chart and
                // don't collide
                if (da.attr('text-anchor') != db.attr('text-anchor')) return;
                // Now let's calculate the distance between
                // these elements. 
                var y2 = db.attr('y');
                var deltaY = y1 - y2;
                
                // Our spacing is greater than our specified spacing,
                // so they don't collide.
                if (Math.abs(deltaY) > spacing) return;
                
                // If the labels collide, we'll push each 
                // of the two labels up and down a little bit.
                again = true;
                var sign = deltaY > 0 ? 1 : -1;
                var adjust = sign * alpha;
                da.attr('y',+y1 + adjust);
                db.attr('y',+y2 - adjust);
            });
        });
        // Adjust our line leaders here
        // so that they follow the labels. 
        if(again) {
            var labelElements = textLabels[0];
            textLines.attr('y2',function(d,i) {
                var labelForLine = d3.select(labelElements[i]);
                return labelForLine.attr('y');
            });
            setTimeout(relax,20);
        }
    }
    relax();
  };

  var setupD3 = function(selectID) {
    svg = d3.select(selectID)
          .append('svg')
          .attr({ "position": "fixed", 
                  "top": "0", 
                  "left": "0", 
                  "height": "500px", 
                  "width": "100%" })
          .append('g')
          .attr('transform', 'translate(' + (width / 2 + 50) +  ',' + (height / 2 - 50) + ')');

      svg.append('g')
        .attr('class', 'slices');
      svg.append('g')
        .attr('class', 'labels');
      svg.append('g')
        .attr('class', 'lines');
  };

    // var labels = svg.select('#labels');
    // var enteringLabels = labels.selectAll('.label').data(pie(data));
    // enteringLabels.enter();
    // var labelGroups = enteringLabels.append('g').attr('class', 'label');
    // labelGroups.append('circle').attr({
    //   x: 0, y: 0, r: 2, fill: '#000',
    //   transform: function(d) {
    //     var centroid = arc.centroid(d);
    //     return 'translate(' + centroid + ')';
    //   }, 'class': 'label-circle'
    // });

    // var textLines = labelGroups.append('line').attr({
    //   x1: function (d) {
    //       return arc.centroid(d)[0];
    //   },
    //   y1: function (d) {
    //       return arc.centroid(d)[1];
    //   },
    //   x2: function (d) {
    //       var centroid = arc.centroid(d);
    //       var midAngle = Math.atan2(centroid[1], centroid[0]);
    //       var x = Math.cos(midAngle) * 175;
    //       return x;
    //   },
    //   y2: function (d) {
    //       var centroid = arc.centroid(d);
    //       var midAngle = Math.atan2(centroid[1], centroid[0]);
    //       var y = Math.sin(midAngle) * 175;
    //       return y;
    //   },
    //       'class': 'label-line'
    // });
    // var textLabels = labelGroups.append('text').attr({
    //     x: function (d) {
    //         var centroid = arc.centroid(d);
    //         var midAngle = Math.atan2(centroid[1], centroid[0]);
    //         var x = Math.cos(midAngle) * 175;
    //         var sign = (x > 0) ? 1 : -1;
    //         var labelX = x + (5 * sign);
    //         return labelX;
    //     },
    //     y: function (d) {
    //         var centroid = arc.centroid(d);
    //         var midAngle = Math.atan2(centroid[1], centroid[0]);
    //         var y = Math.sin(midAngle) * 175;
    //         return y;
    //     },
    //         'text-anchor': function (d) {
    //         var centroid = arc.centroid(d);
    //         var midAngle = Math.atan2(centroid[1], centroid[0]);
    //         var x = Math.cos(midAngle) * 175;
    //         return (x > 0) ? 'start' : "end";
    //     },
    //         'class': 'label-text'
    // }).text(function (d) {
    //     return d.data.key + '( ' + d.data.value + ' )';
    // });
    // var alpha = 0.5;
    // var spacing = 12;

    // function relax() {
    //     var again = false;
    //     textLabels.each(function (d, i) {
    //         var a = this;
    //         var da = d3.select(a);
    //         var y1 = da.attr('y');
    //         textLabels.each(function (d, j) {
    //             var b = this;
    //             // a & b are the same element and don't collide.
    //             if (a == b) return;
    //             var db = d3.select(b);
    //             // a & b are on opposite sides of the chart and
    //             // don't collide
    //             if (da.attr('text-anchor') != db.attr('text-anchor')) return;
    //             // Now let's calculate the distance between
    //             // these elements. 
    //             var y2 = db.attr('y');
    //             var deltaY = y1 - y2;
                
    //             // Our spacing is greater than our specified spacing,
    //             // so they don't collide.
    //             if (Math.abs(deltaY) > spacing) return;
                
    //             // If the labels collide, we'll push each 
    //             // of the two labels up and down a little bit.
    //             again = true;
    //             var sign = deltaY > 0 ? 1 : -1;
    //             var adjust = sign * alpha;
    //             da.attr('y',+y1 + adjust);
    //             db.attr('y',+y2 - adjust);
    //         });
    //     });
    //     // Adjust our line leaders here
    //     // so that they follow the labels. 
    //     if(again) {
    //         var labelElements = textLabels[0];
    //         textLines.attr('y2',function(d,i) {
    //             var labelForLine = d3.select(labelElements[i]);
    //             return labelForLine.attr('y');
    //         });
    //         setTimeout(relax,20);
    //     }
    // }
    // relax();
    // enteringLabels.exit().remove();

  // };



  // var fetchPieData = function(resourceUrl){
  //         d3.json(resourceUrl, function(error, root){
  //           data = root;
  //           renderPie(root);
  //         });
  //       };
  // var fetchLineData = function(resourceUrl, resource, callback){
  //  d3.tsv(resourceUrl, function(error, data){
  //    data = data;
  //    callback(data, resource);
  //  });
  // };

  var urlLine = 'https://gist.githubusercontent.com/shkfnly/9ad173c4c972024521ec/raw/c4e8fc0369683d2706eebcaa28c75ff1a9206883/testdata.tsv';
  // fetchPieData('https://gist.githubusercontent.com/shkfnly/2da4667e9f654be9dfd0/raw/1e5746ae751bff323a8831a105f25fec3577b9fa/testdata.json');
  function link(scope, element, attrs){
    element.children('#pie')[0].id = ('pie-' + scope.resource);
    scope.selectID = '#pie-' + scope.resource;
    setupD3(scope.selectID);
    updatePieChart(d3.entries(scope.info[scope.resource]));
    scope.$watch('info', function(newVal, oldVal, scope){
      updatePieChart(d3.entries(newVal[scope.resource]), d3.entries(oldVal[scope.resource]));

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

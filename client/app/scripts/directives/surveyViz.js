'use strict';
angular.module('urbinsight.directives')
.directive('surveyViz', ['QOLFactory', '$window', function(QOLFactory, $window) {
  var _ = $window._;
  var c3 = $window.c3;

  var colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', 
                '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', 
                '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', 
                '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'];
  var dataXForm = function(obj){
    var results = ['Average Response'];
    _.forEach(obj, function(value, key){
      if (['_id', 'cityName', '__v', 'geoCoordinates'].indexOf(key) === -1){
        results.push(value);
      }
    });
    return [results];
  };

  // var dataXForm = function(obj){
  //   var iterator = 0;
  //   var results = [];
  //   _.forEach(obj, function(value, key){
  //     if (['_id', 'cityName', '__v', 'geoCoordinates'].indexOf(key) === -1){
  //       var temp = [];
  //       for(var i = 0; i < iterator; i++){
  //         temp.push('');
  //       }

  //       temp = temp.concat(value);
  //       temp.unshift(key);
  //       console.log(temp);
  //       results.push(temp);
  //       iterator++;
  //     }
  //   });
  //   return results;
  // };

  function link(scope, element, attrs) {
    scope.showNoDataMessage = Object.keys(scope.info).length === 0;
    scope.chart = c3.generate({
      bindto: '#survey',
      data: {
        columns: dataXForm(scope.info),
        type: 'bar',
        color: function (color, d) {
          return colors[d.index];
        }
      },
      bar: {
        width: {
          ratio: 1
        }
      },
      // legend: {
      //   position: 'right'
      // },
      axis: {
        x: {
          type: 'category',
          categories: ['Employment', 'Healthcare', 'Family', 'Stability', 'Relationships',
                       'Recreation', 'Education', 'Vacation', 'Housing', 'Environment',
                       'Discrimination', 'Religion', 'Mobility', 'Movement', 'Safety', 'Governance' ],
          tick: {
            rotate: 75,
            multiline: false
          }
        },
        y: {
          max: 5.0,
          padding: {
            top:0
          }
         /* tick: {
            format: function(d){ console.log(d);},
            //values: ['Unknown', 'Absent', 'Insufficient', 'Adequate', 'Good', 'Excellent'],
            count: 6
          }*/
        }
      },
      legend: {
        show: false
      },
      transitions: {
        duration: 1000
      },
      tooltip: {
        format: {
          value: function(value) {
            return value.toFixed(2);
          }
        }
      }
    });

    scope.chartTransform = function(param){
      scope.chart.transform(param);
    };

    scope.$watch('info', function(newVal, oldVal, scope){
      scope.showNoDataMessage = Object.keys(newVal).length === 0;
      scope.surveyData = newVal;
      scope.chart.load({
        columns: dataXForm(newVal)
      });
    }, true);
  }
  
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    link: link,
    templateUrl: 'views/cities/surveyVisualization.html'
  };
}]);

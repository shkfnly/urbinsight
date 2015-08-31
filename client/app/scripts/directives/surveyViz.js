'use strict';
angular.module('urbinsight.directives')
.directive('surveyViz', ['QOLFactory', '$window', function(QOLFactory, $window) {
  var _ = $window._;
  var c3 = $window.c3;

  var dataXForm = function(obj){
    var results = [];
    _.forEach(obj, function(value, key){
      results.push([key.toString(), value]);
    });
    return results;
  };

  function link(scope, element, attrs) {
    console.log(Object.keys(scope.info));
    scope.chart = c3.generate({
      bindto: '#survey',
      data: {
        columns: dataXForm(scope.info),
        type: 'bar'
      },
      legend: {
        position: 'right'
      },
      axis: {
        x: {
          type: 'category',
          categories: Object.keys(scope.info)
        }
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

    scope.$watch('info', function(newVal, oldVal, scope){
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

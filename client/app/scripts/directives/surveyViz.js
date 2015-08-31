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
    scope.chart = c3.generate({
      bindto: '#survey',
      data: {
        columns:[
                      ['data1', 30, 200, 100, 400, 150, 250],
                                  ['data2', 130, 100, 140, 200, 150, 50]
                                          ],
        type: 'bar'
      },
      legend: {
        position: 'right'
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

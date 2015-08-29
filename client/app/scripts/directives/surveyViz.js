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
      bindto: 'surveyViz',
      data: {
        columns: dataXForm(scope.surveyData),
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

    scope.$watch('surveyData', function(newVal, oldVal, scope){
      console.log(newVal);
      console.log(oldVal);
      scope.chart.load({
        columns: dataXForm(newVal)
      });
    }, true);
  }
  
  return {
    restrict: 'E',
    scope: {
      surveyData: '='
    },
    link: link,
    templateUrl: 'views/cities/surveyVisualization.html'
  }
}]);

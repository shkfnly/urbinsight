'use strict';
angular.module('urbinsight.directives')
.directive('umisResource', ['ParcelFactory', '$window', function(ParcelFactory, $window) {
  var _ = $window._;
  var c3 = $window.c3;

  var dataXForm = function(obj){
    var results = [];
    _.forEach(obj, function(value, key){
      results.push([key.toString(), value]);
    });
    return results;
  };
  var calculateOverallTotal = function(obj){
    var results = 0;
    _.forEach(obj, function(value){
      results += value;
    });
    return results;
  };

  var defineUnit = function(resource){
    if(resource === 'water'){
      return 'Litres';
    }
  };

  //var urlLine = 'https://gist.githubusercontent.com/shkfnly/9ad173c4c972024521ec/raw/c4e8fc0369683d2706eebcaa28c75ff1a9206883/testdata.tsv';
  // fetchPieData('https://gist.githubusercontent.com/shkfnly/2da4667e9f654be9dfd0/raw/1e5746ae751bff323a8831a105f25fec3577b9fa/testdata.json');
  function link(scope, element, attrs){
    scope.showNoDataMessage = Object.keys(scope.info[scope.resource]).length === 0;
    element.children('#pie')[0].id = ('pie-' + scope.resource);
    scope.selectID = '#pie-' + scope.resource;
    scope.unit = defineUnit(scope.resource);
    scope.overallTotal = calculateOverallTotal(scope.info[scope.resource]);
    scope.pieChart = c3.generate({
      bindto: scope.selectID,
      data: {
        columns: dataXForm(scope.info[scope.resource]),
        type: 'pie'      
      },
      legend: {
        position: 'right'
      },
      transition: {
          duration: 1000
      },
      tooltip: {
        format: {
          value: function(value, ratio, id) { 
            return value.toFixed(2) + ' Litres';
          }
        }
      }
    });

    scope.chartTransform = function(param){
      scope.pieChart.transform(param);
    };
    scope.$watch('info', function(newVal, oldVal, scope){
      scope.showNoDataMessage = Object.keys(newVal[scope.resource]).length === 0;

      scope.pieChart.load({
        columns: dataXForm(newVal[scope.resource])
      });
      scope.overallTotal = calculateOverallTotal(newVal[scope.resource]);
    }, true);
  }

  return {
    restrict: 'E',
    scope: {
      info: '=',
      resource: '=',
      parcels: '=',
    },
    link: link,
    templateUrl: 'views/pilot_cities/umisResource.html'
  };
}]);

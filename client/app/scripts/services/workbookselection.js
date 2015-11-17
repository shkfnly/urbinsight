'use strict';

/**
 * @ngdoc service
 * @name urbinsight.workbookSelection
 * @description
 * # workbookSelection
 * Service in the urbinsight.
 */
angular.module('urbinsight')
  .factory('workbookSelection', ['$state', function ($state) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  return {
    workbookGenerator: function(){
      var that = this;
      this.workbookStore = [];
      _.forEach(this.selectedWorkbooks, function(value, key){
       if(value === true){
        that.workbookStore.push(that.workbookValues[key]);
       }
      });
      this.workbookStore.push('app.city.pilot.umis.form.submit');
    },
    workbookIterator: function(){
      return $state.go(this.workbookStore.shift());
    },
    resetSelections: function(){
      debugger;
      this.selectedWorkbooks = {
      'water': false,
      'materials': false,
      'energy': false,
      'mobility': false
      }
    },
    selectedWorkbooks: {
    'water': false,
    'materials': false,
    'energy': false,
    'mobility': false
    },
    workbookValues: {
      water: 'app.city.pilot.umis.form.waterWorkbook.landCoverPreCalc',
      materials: 'app.city.pilot.umis.form.materialsWorkbook',
    },
   workbookStore: ['app.city.pilot.umis.form.submit']
  }
  }]);

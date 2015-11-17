'use strict';

describe('Controller: PilotCitiesDashboardUmisWaterworkbookCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var PilotCitiesDashboardUmisWaterworkbookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PilotCitiesDashboardUmisWaterworkbookCtrl = $controller('PilotCitiesDashboardUmisWaterworkbookCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PilotCitiesDashboardUmisWaterworkbookCtrl.awesomeThings.length).toBe(3);
  });
});

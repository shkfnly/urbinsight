'use strict';

describe('Controller: PilotCitiesDashboardUmisMaterialsworkbookCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var PilotCitiesDashboardUmisMaterialsworkbookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PilotCitiesDashboardUmisMaterialsworkbookCtrl = $controller('PilotCitiesDashboardUmisMaterialsworkbookCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PilotCitiesDashboardUmisMaterialsworkbookCtrl.awesomeThings.length).toBe(3);
  });
});

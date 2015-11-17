'use strict';

describe('Controller: PilotCitiesDashboardUmisWorkbookselectionCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var PilotCitiesDashboardUmisWorkbookselectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PilotCitiesDashboardUmisWorkbookselectionCtrl = $controller('PilotCitiesDashboardUmisWorkbookselectionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PilotCitiesDashboardUmisWorkbookselectionCtrl.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: DashboardVancouverCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var DashboardVancouverCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DashboardVancouverCtrl = $controller('DashboardVancouverCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

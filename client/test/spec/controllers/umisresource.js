'use strict';

describe('Controller: UmisresourceCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var UmisresourceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UmisresourceCtrl = $controller('UmisresourceCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
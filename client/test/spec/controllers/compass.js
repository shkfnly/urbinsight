'use strict';

describe('Controller: CompassCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var CompassCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompassCtrl = $controller('CompassCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
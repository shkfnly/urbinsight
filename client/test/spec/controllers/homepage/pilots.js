'use strict';

describe('Controller: PilotsCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var PilotsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PilotsCtrl = $controller('PilotsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

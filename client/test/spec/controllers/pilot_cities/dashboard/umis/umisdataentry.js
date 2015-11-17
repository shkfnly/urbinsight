'use strict';

describe('Controller: UmisdataentryCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var UmisdataentryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UmisdataentryCtrl = $controller('UmisdataentryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Controller: ResourcetabCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ResourcetabCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResourcetabCtrl = $controller('ResourcetabCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

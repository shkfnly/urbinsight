'use strict';

describe('Controller: BasedataCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var BasedataCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BasedataCtrl = $controller('BasedataCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

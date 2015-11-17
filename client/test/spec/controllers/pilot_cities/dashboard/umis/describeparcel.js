'use strict';

describe('Controller: DescribeparcelCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var DescribeparcelCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DescribeparcelCtrl = $controller('DescribeparcelCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

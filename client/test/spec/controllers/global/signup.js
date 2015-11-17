'use strict';

describe('Controller: SignupCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var SignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupCtrl = $controller('SignupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
  it('should create a signup and user object', function () {
    expect(scope.signup).toBe({});
    expect(scope.user).toBe({});
  });
});

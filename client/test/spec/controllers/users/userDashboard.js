'use strict';

describe('Controller: UserDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('urbinsight'));

  var UserDashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDashboardCtrl = $controller('UserDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

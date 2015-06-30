'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('LoginCtrl', function ($scope, $window, $rootScope, $location, UserAuthFactory, AuthFactory) {
      // Create local references
    var user, login;

    // Create a scope for the Signup page.
    $scope.login = login = {};

    // This is the model populated in signup.html
    login.user = user = {};

    login.submit = function () {
      var username = user.username,
        password = user.password;

      if (username !== undefined && password !== undefined) {
        UserAuthFactory.login(username, password).success(function(data) {
          
          $rootScope.showMenu = true;
          AuthFactory.changeLoggedStatus();
          AuthFactory.user = data.user.username;
          AuthFactory.userRole = data.user.role;

          // $rootScope.$broadcast('loginStateChange');

          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.username;
          $window.sessionStorage.userRole = data.user.role;
          $location.path('/');
        }).error(function(status) {
          $window.alert('Oops something went wrong!');
        });
      } else {
        $window.alert('Invalid credentials');
      }
    };

  });

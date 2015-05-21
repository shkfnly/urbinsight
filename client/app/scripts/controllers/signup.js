'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('SignupCtrl', function ($scope, $location, $rootScope, $http, AuthFactory) {
    
    // Create local references
    var user, signup;

    // Create a scope for the Signup page.
    $scope.signup = signup = {};

    // This is the model populated in signup.html
    signup.user = user = {};

    // Method to post to the server
    signup.submit = function () {
      // this is how you make validations
      if (  
            !user.username ||
            !user.email ||
            !user.password1 ||
            !user.password2
      ) {
        window.alert('Please fill out all fields.');
        return false;
      }

      // password validation
      if (user.password1 !== user.password2) {
        window.alert('Your passwords must match.');
        return false;
      }

      // Make the server request
      var request = $http.post('/signup/', user);

      request.success(function (data) {
        $location.path('/dashboard');
        $rootScope.currentUser = data.client;
        console.log(data);
        $rootScope.showMenu = true;
      });

      request.error(function (data) {
        console.log('error');
      });
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SignupCtrl', function ($scope, $http) {
    
    // Create local references
    var user, signup;

    // Create a cope for the Signup page.
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
      //UNECESSARY
      // console.log(user);

      // Make the server request
      var request = $http.post('/signup', user);

      request.success(function (data) {
        console.log('success');
        console.log(data);
      });

      request.error(function (data) {
        console.log('error');
        console.log(data);
      });
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

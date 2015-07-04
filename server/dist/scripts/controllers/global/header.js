'use strict';

/**
 * @ngdoc function
 * @name urbinsight.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the urbinsight
 */
angular.module('urbinsight')
  .controller('HeaderCtrl', function ($scope, $rootScope, $state, $location, UserAuthFactory, AuthFactory) {

    $scope.logout = function () {
      UserAuthFactory.logout();
      $rootScope.$broadcast('loginStateChange');
      $location.path('/');
    };

    $rootScope.$on('loginStateChange', function(){
      $rootScope.showMenu = AuthFactory.loggedStatus(); 
    });
  });


//   .directive('urbHeader', function() {
//   return {
//     templateUrl: 'views/partials/_header.html'
//   };
// });

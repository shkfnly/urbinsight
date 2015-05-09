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

    $scope.showMenu = AuthFactory.loggedStatus();

    $rootScope.$on('loginStateChange', function(){
      console.log($scope.showMenu)
      $scope.showMenu = AuthFactory.loggedStatus(); 
      console.log($scope.showMenu)
    })
  })

  // $scope.AuthFactory = AuthFactory;
  // $scope.$watch('AuthFactory.loggedStatus()', function(newVal, oldVal){
  //   $scope.showMenu = newVal;
  // })

//   .directive('urbHeader', function() {
//   return {
//     templateUrl: 'views/partials/_header.html'
//   };
// });

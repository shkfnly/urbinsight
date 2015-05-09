'use strict';

/**
 * @ngdoc overview
 * @name urbinsight
 * @description
 * # urbinsight
 *
 * Main module of the application.
 */

 var app = angular
  .module('urbinsight', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'urbinsight.services'
  ]);

  app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('TokenIntercept');
    // Setup the states
    $stateProvider
      .state('app', {
        url: '',
        views: {
          'header': {
                templateUrl: 'views/partials/_header.html',
                controller: 'HeaderCtrl'
          }
        }
      })
      .state('app.main', {
        abstract: true,
        views: {
          'container@': {
            templateUrl: 'views/main.html'
          }
        }
      })
      .state('app.main.homepage', {
        url: '/',
        controller: 'MainCtrl',
        views: {
          'landing': {
            templateUrl: 'views/homepage/landing.html'
          },
          'pilotProcess': {
            templateUrl: 'views/homepage/pilotProcess.html',
            controller: 'ProcessCtrl'
          },
          'pilots': {
            templateUrl: 'views/homepage/pilots.html',
            controller: 'PilotsCtrl'
          },
          'layerIntro': {
            templateUrl: 'views/homepage/layerIntro.html'
          },

          'contact': {
            templateUrl: 'views/homepage/contact.html'
          }
        }
      })
      .state('app.about', {
        url: '/about',
        views: {
          'container@' : {
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
          }
        }
      })
      .state('app.signup', {
        url: '/signup',
        views: {
          'container@' : {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl'
          }
        }
      })
      .state('app.compass', {
        url: '/compass',
        views: {
          'container@' : {
            templateUrl: 'views/compass.html',
            controller: 'CompassCtrl'
          }
        },
        access: {
          requiredLogin: true
        }
      })
      .state('app.city', {
        views: {
          'container@' : {
            templateUrl: 'views/cities/cityDefault.html',
            controller: 'CitiesCtrl'
          }
        }
      })
      .state('app.city.pilot', {
        url: '/dashboard/:city_name',
        views: {
          'mapModal': {
            templateUrl: 'views/cities/mapmodal.html',
            controller: 'MapModalCtrl'
          },
          'resourceTab': {
            templateUrl: 'views/cities/resourceTab.html',
            controller: 'ResourceTabCtrl'
          }
        }
      })
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'container@' : {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'  
          }
        }
      })
      .state('app.login', {
        url: '/login',
        views: {
          'container@' : {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
          }
        }
      });
  })

.run(function($rootScope, $window, $location, AuthFactory) {
  AuthFactory.check();

  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthFactory.isLogged) {
      $location.path('/login');
    } else {
      if (!AuthFactory.user) { AuthFactory.user = $window.sessionStorage.user;}
      if (!AuthFactory.userRole) { AuthFactory.userRole = $window.sessionStorage.userRole;}
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
    $rootScope.showMenu = AuthFactory.loggedStatus();
    $rootScope.role = AuthFactory.userRole;

    if (AuthFactory.isLogged === true && $location.path() === '/login') {
      $location.path('/');
    }
  });
});

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
    'ui.bootstrap'
  ]);

  app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Setup the states
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'views/app.html',
        data: {
          requireLogin: false// this property will apply to all children of 'app'
        }
      })
      .state('app.main', {
        abstract: true,
        templateUrl: 'views/main.html',
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
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
      })
      .state('app.signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
      })
      .state('app.compass', {
        url: '/compass',
        templateUrl: 'views/compass.html',
        controller: 'CompassCtrl'
      })
      .state('app.city', {
        templateUrl: 'views/cities/cityDefault.html',
        controller: 'CitiesCtrl'
      })
      .state('app.city.pilot', {
        url: '/dashboard/:city_name',
        views: {
          'mapModal': {
            templateUrl: 'views/cities/mapmodal.html',
            controller: 'MapModalCtrl'
          }
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      });
  });

  
  // app.run(function ($rootScope) {
  //   $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
  //     var requireLogin = toState.data.requireLogin;

  //     if (requireLogin && typeof $rootScope.currentUser === 'undefined') {
  //       event.preventDefault();
  //     }
  //   });
  // });

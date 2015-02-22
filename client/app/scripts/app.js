'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */

 var app = angular
  .module('clientApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ]);

  app.config(function ($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /

    $urlRouterProvider.otherwise('/');

    // Setup the states
    $stateProvider
      .state('main', {
        abstract: true,
        templateUrl: 'views/main.html',
        data: {
          requireLogin: false
        }
      })
      .state('main.homepage', {
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
          'compass': {
            templateUrl: 'views/homepage/compass.html'
          },
          'contact': {
            templateUrl: 'views/homepage/contact.html'
          }
        }
      })

      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        data: {
          requireLogin: false
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        data: {
          requireLogin: false
        }
      })
      .state('app', {
        abstract: true,
        url: '#',
        data: {
          requireLogin: false// this property will apply to all children of 'app'
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('vancouver', {
        url: '/dashboard/vancouver',
        templateUrl: 'views/cities/vancouver.html',
        controller: 'CitiesCtrl'
      })
      .state('medellin', {
        url: '/dashboard/medellin',
        templateUrl: 'views/cities/vancouver.html',
        controller: 'CitiesCtrl'
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

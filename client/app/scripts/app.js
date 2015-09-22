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
    'urbinsight.services',
    'urbinsight.directives'
  ]);

  app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/#');
    $httpProvider.interceptors.push('TokenIntercept');

    // Setup the states
    $stateProvider
      .state('app', {
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
          }
        }
      })
      .state('app.city.pilot', {
        url: '/dashboard/:cityName',
        views: {
          'cityMap': {
            templateUrl: 'views/cities/cityMap.html',
            controller: 'MapCtrl'
          },
          'mapModal': {
            templateUrl: 'views/cities/mapmodal.html',
            controller: 'MapModalCtrl'
          }
        }
      })
      .state('app.city.pilot.umis', {
        views: {
          'umisTabs': {
            templateUrl: 'views/cities/umisTabs.html',
            controller: 'UmisResourceCtrl'
          }
        },
      })
      .state('app.city.pilot.umis.dataEntry', {
        views: {
          'umisForm': {
            templateUrl: 'views/cities/dataEntry/umis_form.html',
            controller: 'umisDataEntryCtrl'
          }
        }
      })
      .state('app.city.pilot.umis.dataEntry.addParcel', {
          views: {
          'describeparcel': {
            templateUrl: 'views/cities/dataEntry/describe_parcel.html',
            controller: 'describeParcelCtrl'
          },
          'workbookwater':{
            templateUrl: 'views/cities/dataEntry/workbooks/water.html'
          }
        }
      })
      .state('app.city.pilot.survey', {
        views: {
          'survey': {
            templateUrl: 'views/cities/survey.html',
            controller: 'qolCtrl'
          }
        }
      })
      .state('app.city.pilot.survey.dataEntry', {
        views: {
          'surveyForm': {
            templateUrl: 'views/cities/dataEntry/qol_form.html',
            controller: 'qolDataEntryCtrl'
          }
        }
      })
      .state('app.city.pilot.assessments', {
        views: {
          'assessments': {
            templateUrl: 'views/cities/assessments/assessments.html'
          }
        }
      })
      .state('app.city.pilot.assessments.air', {
        views: {
          'air' : { 
            templateUrl: 'views/cities/assessments/air.html'
          }
        }
      })
      .state('app.city.pilot.assessments.water', {
        views: {
          'water' : { 
            templateUrl: 'views/cities/assessments/water.html'
          }
        }
      })
      .state('app.city.pilot.assessments.soil', {
        views: {
          'soil' : { 
            templateUrl: 'views/cities/assessments/soil.html'
          }
        }
      })
      .state('app.city.pilot.basedata', {
        views: {
          'basedata': {
            templateUrl: 'views/cities/basedata.html',
            controller: 'BasedataCtrl'
          }
        }
      })
      .state('app.dashboard', {
        url: '/dashboard',
        views: {
          'container@' : {
            templateUrl: 'views/dashboard.html',
            controller: 'UserDashboardCtrl'  
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
  }]);

angular.module('urbinsight.services', []);
angular.module('urbinsight.directives', []);

// app.run(['$rootScope', '$window', '$location', 'AuthFactory', function($rootScope, $window, $location, AuthFactory) {
//   AuthFactory.check();

//   $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
//     console.log('nextRoute:' + nextRoute);
//     console.log('currentRoute:' + currentRoute);
//     console.log('nextRoute.access:' + nextRoute.access);
//     console.log('nextRoute.access.requiredLogin:' + nextRoute.access.requiredLogin);
//     if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthFactory.isLogged) {
//       $location.path('/login');
//     } else {
//       if (!AuthFactory.user) { AuthFactory.user = $window.sessionStorage.user;}
//       if (!AuthFactory.userRole) { AuthFactory.userRole = $window.sessionStorage.userRole;}
//     }
//   });

// // event, nextRoute, currentRoute
//   $rootScope.$on('$routeChangeSuccess', function() {
//     $rootScope.showMenu = AuthFactory.loggedStatus();
//     $rootScope.role = AuthFactory.userRole;

//     if (AuthFactory.isLogged === true && $location.path() === '/login') {
//       $location.path('/');
//     }
//   });
// }]);


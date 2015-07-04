'use strict';

angular.module('urbinsight.services')
  .factory('AuthFactory', function ($window) {
    var isLogged = false;

    return {
      check: function() {
        if ($window.sessionStorage.token && $window.sessionStorage.user) {
          isLogged = true;
        } else {
          isLogged = false;
          delete this.user;
        }
      },
      loggedStatus: function() {
        return isLogged;
      },
      changeLoggedStatus: function() {
        isLogged = !(isLogged);
      }
    };
  })

  .factory('UserAuthFactory', function($window, $location, $http, AuthFactory) {
    return {
      login: function(username, password) {
        return $http.post('/login/', {
          username: username,
          password: password
        });
      },
      logout: function() {
        if (AuthFactory.loggedStatus()) {

          AuthFactory.changeLoggedStatus();
          delete AuthFactory.user;
          delete AuthFactory.userRole;

          delete $window.sessionStorage.token;
          delete $window.sessionStorage.user;
          delete $window.sessionStorage.userRole;

          $location.path('/');
        }
      }
    };
  })
  .factory('TokenIntercept', function($q, $window) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers['X-Access-Token'] = $window.sessionStorage.token;
          config.headers['X-Key'] = $window.sessionStorage.user;
          config.headers['Content-Type'] = 'application/json';
        }
        return config || $q.when(config);
      },

      response: function(response) {
        return response || $q.when(response);
      }
    };
  });

'use strict';

//Setting up route
angular.module('mean.recoms').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all recommendations', {
        url: '/recommendations',
        templateUrl: 'recoms/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create recommendation', {
        url: '/recommendations/create',
        templateUrl: 'recoms/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit recommendation', {
        url: '/recommendations/:recomId/edit',
        templateUrl: 'recoms/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('article by id', {
        url: '/recommendations/:recomId',
        templateUrl: 'recoms/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);

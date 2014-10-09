'use strict';

//Recoms service used for recommendations REST endpoint
angular.module('mean.recoms').factory('Recoms', ['$resource',
  function($resource) {
    return $resource('recommendations/:recomId', {
      recomId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

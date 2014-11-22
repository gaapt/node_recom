'use strict';

angular.module('mean.analyser').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('analyser page', {
      url: '/analyser',
      templateUrl: 'analyser/views/index.html'
    });
  }
]);

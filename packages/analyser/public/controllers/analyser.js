'use strict';

angular.module('mean.analyser').controller('AnalyserController', ['$scope', 'Global', 'Analyser',
  function($scope, Global, Analyser) {
    $scope.global = Global;
    $scope.package = {
      name: 'analyser'
    };
  }
]);

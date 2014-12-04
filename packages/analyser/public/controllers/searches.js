'use strict';

angular.module('mean.analyser').controller('SearchesController', ['$scope', '$http', '$log', 'Global',
    function($scope, $http, $log, Global) {
        $scope.global = Global;
        $scope.configs = [];

        $scope.getAnalystInfo = $http.get('/api/analyseSearches').success(function(data) {
            //$log.info(data);
            $scope.configs = data;
        }).error(function(err) {
            $log.info(err);
        });
    }
]);

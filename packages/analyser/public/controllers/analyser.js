'use strict';

angular.module('mean.analyser').controller('AnalyserController', ['$scope', '$http', '$log', 'Global', 'Analyser',
    function($scope, $http, $log, Global, Analyser) {
        $scope.global = Global;
        $scope.includePath = '';
        $scope.selected = -1;

        $scope.menuItems = [{
        	title: 'Data Mining',
        	html: 'analyser/views/mining.html',
        	icon: 'glyphicon glyphicon-tower'
        }, {
        	title: 'Transitions',
        	html: 'analyser/views/transitions.html',
        	icon: 'glyphicon glyphicon-random'
        }, {
        	title: 'Search',
        	html: 'analyser/views/searches.html',
        	icon: 'glyphicon glyphicon-search'
        }, {
        	title: 'Estimations',
        	html: 'analyser/views/estimations.html',
        	icon: 'glyphicon glyphicon-certificate'
        }, {
        	title: 'Commentating',
        	html: 'analyser/views/commentations.html',
        	icon: 'glyphicon glyphicon-pencil'
        }];

        $scope.selectMenuItem = function(path, index) {
        	$scope.includePath = path;
        	$scope.selected = index;
        };
    }
]);

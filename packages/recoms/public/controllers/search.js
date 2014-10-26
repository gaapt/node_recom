'use strict';

angular.module('mean.recoms').controller('SearchController', ['$scope', '$stateParams', '$location', '$http', '$log', '$sce', 'modalService', 'Global', 'Recoms',
		function ($scope, $stateParams, $location, $http, $log, $sce, modalService, Global, Recoms) {
			$scope.global = Global;
			$scope.search = {};

			$scope.find = function () {
				$log.info($scope.search);
				$http({
					url: '/api/findRecoms',
					method: 'POST',
					data: { 'search' : $scope.search }
				})
				.then(function(response) {
					$log.info(response);
					$scope.recoms = response.data;
				}, function(response) {
					$log.info(response);
				});
			};
			
			$scope.renderHtml = function(html_code) {
				return $sce.trustAsHtml(html_code);
			};
			
			$scope.appointments = ['Technical', 'Management', '--Other--'];
			$scope.phases = ['Preliminary analysis', 'Requirements definition', 'System design', 'Development', 'Integration and testing', 'Acceptance, installation, deployment', 'Maintenance', 'Evaluation', 'Disposal'];
			$scope.arches = ['Monolith', 'Client-server', '--Other--'];
		}
	]);

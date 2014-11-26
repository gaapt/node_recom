'use strict';

angular.module('mean.recoms').controller('SearchController', ['$scope', '$stateParams', '$location', '$http', '$log', '$sce', 'modalService', 'Global', 'Recoms',
		function ($scope, $stateParams, $location, $http, $log, $sce, modalService, Global, Recoms) {
			$scope.global = Global;
			$scope.search = {};

			$scope.find = function () {
				//$log.info($scope.search);
				if(JSON.stringify($scope.search) === JSON.stringify({cond_phase: [], tags: []})) {
					$scope.alert = {type: 'warning', text: 'You have to specify options for searching.'};
					$scope.recoms = [];
					return;
				}
				$scope.alert = false;
				$http({
					url: '/api/findRecoms',
					method: 'POST',
					data: { 'search' : $scope.search }
				})
				.then(function(response) {
					//$log.info(response);
					if(response.data.length === 0) {
						$scope.recoms = [];
						$scope.alert = {type: 'info', text: 'Nothing was found'};
					} else
						$scope.recoms = response.data;
				});
			};
			
			$scope.renderHtml = function(html_code) {
				return $sce.trustAsHtml(html_code);
			};
			
			$scope.appointments = ['Technical', 'Management', '--Other--'];
			$scope.phases = ['Preliminary analysis', 'Requirements definition', 'System design', 'Development', 'Integration and testing', 'Acceptance, installation, deployment', 'Maintenance', 'Evaluation', 'Disposal'];
			$scope.arches = ['Monolith', 'Client-server', '--Other--'];
			$scope.tags = [];
			$http.get('/api/getAllTags')
				.success(function (data) {
					//$log.info(data);
					$scope.tags = data;
				}).error(function (data, status) {
					if (status === 500)
						$log.error('error :(');
				});
			
			$scope.closeAlert = function (i) {
				$scope.alert = false;
			};
		}
	]);

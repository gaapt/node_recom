'use strict';

angular.module('mean.recoms').controller('SearchController', ['$scope', '$stateParams', '$location', '$http', '$log', '$sce', 'modalService', 'Global', 'Recoms',
		function ($scope, $stateParams, $location, $http, $log, $sce, modalService, Global, Recoms) {
			$scope.global = Global;
			$scope.search = {};

			$scope.find = function () {
				//$log.info($scope.search);
				if (JSON.stringify($scope.search) === JSON.stringify({
						cond_phase : [],
						tags : []
					})) {
					$scope.alert = {
						type : 'warning',
						text : 'You have to specify options for searching.'
					};
					$scope.recoms = [];
					return;
				}
				$scope.alert = false;
				$http({
					url : '/api/findRecoms',
					method : 'POST',
					data : {
						'search' : $scope.search
					}
				})
				.then(function (response) {
					//$log.info(response);
					if (response.data.length === 0) {
						$scope.recoms = [];
						$scope.alert = {
							type : 'info',
							text : 'Nothing was found'
						};
					} else
						$scope.recoms = response.data;
				});
			};

			$scope.renderHtml = function (html_code) {
				return $sce.trustAsHtml(html_code);
			};

			/*$scope.addAppointment = function (option) {
				if (option === '--Other--') {
					var modalOptions = {
						closeButtonText : 'Cancel',
						actionButtonText : 'Confirm',
						headerText : 'Add appointment',
						bodyText : 'Specify the appointment of new recommendation, please.'
					};

					modalService.showModal({}, modalOptions).then(function (result) {
						$scope.appointments.splice($scope.appointments.length - 1, 0, result);
					});
				}
			};

			$scope.addArch = function (option) {
				if (option === '--Other--') {
					var modalOptions = {
						closeButtonText : 'Cancel',
						actionButtonText : 'Confirm',
						headerText : 'Add architecture type',
						bodyText : 'Specify the architecture type, please.'
					};

					modalService.showModal({}, modalOptions).then(function (result) {
						$scope.arches.splice($scope.arches.length - 1, 0, result);
					});
				}
			};*/

			$scope.appointments = [];//['Technical', 'Management', '--Other--'];
			$scope.phases = ['Preliminary analysis', 'Requirements definition', 'System design', 'Development', 'Integration and testing', 'Acceptance, installation, deployment', 'Maintenance', 'Evaluation', 'Disposal'];
			$scope.arches = [];//['Monolith', 'Client-server', '--Other--'];
			$scope.tags = [];
			$http.get('/api/getAllTags')
			.success(function (data) {
				//$log.info(data);
				$scope.tags = data[0];
				$scope.arches = data[1];
				$scope.appointments = data[2];
			}).error(function (data, status) {
				if (status === 500)
					$log.error('error :(');
			});

			$scope.closeAlert = function (i) {
				$scope.alert = false;
			};

			$scope.clearSearchBox = function () {
				$scope.search = {};
			};
		}
	]);

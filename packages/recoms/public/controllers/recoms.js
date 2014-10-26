'use strict';

angular.module('mean.recoms').controller('RecomsController', ['$scope', '$stateParams', '$location', '$http', '$log', '$sce', 'modalService', 'Global', 'Recoms',
		function ($scope, $stateParams, $location, $http, $log, $sce, modalService, Global, Recoms) {
			$scope.global = Global;
			$scope.rec = {};

			$scope.hasAuthorization = function (recom) {
				if (!recom || !recom.user)
					return false;
				return $scope.global.isAdmin || recom.user._id === $scope.global.user._id;
			};

			$scope.create = function (isValid) {
				if (isValid) {
					var recom = new Recoms({
							title : this.rec.title,
							author : this.rec.author,
							appointment : this.rec.appointment,
							cond_phases : this.rec.cond_phase,
							cond_arch : this.rec.cond_arch,
							cond_tech : this.rec.cond_tech,
							req_resources : this.rec.req_resources,
							consequences_use : this.rec.consequences_use,
							consequences_noneuse : this.rec.consequences_noneuse,
							content : this.rec.content
						});
					recom.$save(function (response) {
						$location.path('recommendations/' + response._id);
					});

					this.title = '';
					this.content = '';
				} else {
					$scope.submitted = true;
				}
			};

			$scope.remove = function (recom) {
				if (recom) {
					//recom.$remove();
					Recoms.remove({
						recomId : recom._id
					});

					for (var i in $scope.recoms) {
						if ($scope.recoms[i] === recom) {
							$scope.recoms.splice(i, 1);
						}
					}
				} else {
					$scope.recom.$remove(function (response) {
						$location.path('recommendations');
					});
				}
			};

			$scope.update = function (isValid) {
				if (isValid) {
					//$log.warn($scope.rec);
					var recom = $scope.rec;
					recom.user = recom.user._id;
					if (!recom.updated) {
						recom.updated = [];
					}
					recom.updated.push(new Date().getTime());

					Recoms.update({
						recomId : recom._id
					}, recom);
					$location.path('recommendations/' + recom._id);
				} else {
					$scope.submitted = true;
				}
			};

			$scope.find = function () {
				/*Recoms.query(function (recoms) {
					$scope.recoms = recoms;
				});*/
				$http.get('/api/getAllWithMarks')
				.success(function (data) {
					//$log.info(data);
					$scope.recoms = data;
				}).error(function (data, status) {
					if (status === 500)
						$log.error('error :(');
				});
			};

			$scope.findOne = function () {
				/*Recoms.get({
					recomId : $stateParams.recomId
				}, function (recom) {
					$log.info(recom);
					$scope.recom = recom;
				});*/
				$http.get('/api/getRecom', {
					params : {
						recId: $stateParams.recomId
					}
				}).success(function (data) {
					$log.info(data);
					$scope.rec = data;
				}).error(function (data, status) {
					if (status === 500)
						$log.error('error :(');
				});
			};

			$scope.appointments = ['Technical', 'Management', '--Other--'];
			$scope.phases = ['Preliminary analysis', 'Requirements definition', 'System design', 'Development', 'Integration and testing', 'Acceptance, installation, deployment', 'Maintenance', 'Evaluation', 'Disposal'];
			$scope.arches = ['Monolith', 'Client-server', '--Other--'];
			$scope.rec.cond_tech = ['NodeJS', 'OOP', 'AOP'];
			$scope.rec.req_resources = ['Time', 'Money'];

			$scope.addAppointment = function (option) {
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
			};
			
			$scope.max = 10;
			$scope.isReadonly = false;

			if ($stateParams.recomId) {
				$http.get('/api/getMark', {
					params : {
						recId : $stateParams.recomId
					}
				}).success(function (data) {
					//$log.info('mark: '+data);
					$scope.mark = data;
					getRate();
				}).error(function (data, status) {
					if (status === 500)
						$log.error('error :(');
				});
			}
			
			$scope.setMark = function (m) {
				$http.get('/api/setMark', {
					params : {
						mark : m,
						recId: $stateParams.recomId
					}
				}).success(function (data) {
					//$log.info(data);
					getRate();
				}).error(function (data, status) {
					if (status === 500)
						$log.error('error :(');
				});
			};
			
			function getRate() {
				$http.get('/api/getRate', {
					params : {
						recId: $stateParams.recomId
					}
				}).success(function (data) {
					//$log.info(data);
					$scope.rate = data;
				}).error(function (data, status) {
					if (status === 500)
						$log.error('error :(');
				});
			}
			
			$scope.renderHtml = function(html_code) {
				return $sce.trustAsHtml(html_code);
			};
		}
	]);

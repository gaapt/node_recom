'use strict';

angular.module('mean.recoms').controller('RecomsController', ['$scope', '$stateParams', '$location', '$log', 'modalService', 'Global', 'Recoms',
		function ($scope, $stateParams, $location, $log, modalService, Global, Recoms) {
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
							appointment : this.rec.appointment.name,
							cond_phases : this.rec.cond_phase,
							cond_arch : this.rec.cond_arch,
							cond_tech : $scope.cond_tech,
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
					recom.$remove();

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
					var recom = $scope.recom;
					if (!recom.updated) {
						recom.updated = [];
					}
					recom.updated.push(new Date().getTime());

					recom.$update(function () {
						$location.path('recommendations/' + recom._id);
					});
				} else {
					$scope.submitted = true;
				}
			};

			$scope.find = function () {
				Recoms.query(function (recoms) {
					$scope.recoms = recoms;
				});
			};

			$scope.findOne = function () {
				Recoms.get({
					recomId : $stateParams.recomId
				}, function (recom) {
					$scope.recom = recom;
				});
			};

			$scope.appointments = [{
					name : 'Technical'
				}, {
					name : 'Management'
				}, {
					name : '--Other--'
				}
			];

			$scope.phases = ['Preliminary analysis', 'Requirements definition', 'System design', 'Development', 'Integration and testing', 'Acceptance, installation, deployment', 'Maintenance', 'Evaluation', 'Disposal'];

			$scope.addAppointment = function (option) {
				if (option.name === '--Other--') {
					var modalOptions = {
						closeButtonText : 'Cancel',
						actionButtonText : 'Confirm',
						headerText : 'Add appointment',
						bodyText : 'Specify the appointment of new recommendation, please.'
					};

					modalService.showModal({}, modalOptions).then(function (result) {
						$scope.appointments.splice($scope.appointments.length-1, 0, {
							'name' : result
						});
					});
				}
			};
			
			$scope.arches = ['Monolith', 'Client-server', '--Other--'];
			
			$scope.addArch = function (option) {
				if (option === '--Other--') {
					var modalOptions = {
						closeButtonText : 'Cancel',
						actionButtonText : 'Confirm',
						headerText : 'Add architecture type',
						bodyText : 'Specify the architecture type, please.'
					};

					modalService.showModal({}, modalOptions).then(function (result) {
						$scope.arches.splice($scope.arches.length-1, 0, result);
					});
				}
			};
			
			$scope.cond_tech = ['NodeJS', 'OOP', 'AOP'];
		}
	]);
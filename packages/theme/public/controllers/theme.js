'use strict';

angular.module('mean.theme')
.controller('ThemeController', ['$scope', '$http', '$log', '$cookies', 'Global', '$rootScope',
		function ($scope, $http, $log, $cookies, Global, $rootScope) {
			$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
				var toPath = toState.url.replace('/', '');
				$scope.state = toPath;
				if ($scope.state === '') {
					$scope.state = 'firstPage';
				}

				$http({
					url : '/api/transition',
					method : 'POST',
					data : {
						targetURL : toState.url,
						prevURL : fromState.url
					}
				});
				/*.success(function (response) {
					$log.info(response);
				})
				.error(function (response) {
					$log.error('error');
				});*/
				
			});
			// Original scaffolded code.
			$scope.global = Global;
			$scope.package = {
				name : 'theme'
			};
		}
	]);

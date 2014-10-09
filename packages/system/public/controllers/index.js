'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global',
		function ($scope, Global) {
			$scope.global = Global;
		}
	]);

angular.module('mean.system').controller('CarouselCtrl', function ($scope) {
	$scope.myInterval = 5000;
	var slides = $scope.slides = [];
	$scope.addSlide = function () {
		var newWidth = 1 + slides.length;
		slides.push({
			image : '/system/assets/img/slider/' + newWidth + '.jpg',
			text : ['Learning from experience', 'Choosing the Right Approach', 'Your experience is important', 'We will help you to find a solution',
				'And share it with others'][slides.length % 5]
		});
	};
	$scope.addSlide();
	$scope.addSlide();
	$scope.addSlide();
	$scope.addSlide();
	$scope.addSlide();
});

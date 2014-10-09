'use strict';

angular.module('mean.recoms').controller('RecomsController', ['$scope', '$stateParams', '$location', 'Global', 'Recoms',
  function($scope, $stateParams, $location, Global, Recoms) {
    $scope.global = Global;

    $scope.hasAuthorization = function(recom) {
      if (!recom || !recom.user) return false;
      return $scope.global.isAdmin || recom.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var recom = new Recoms({
          title: this.title,
          content: this.content
        });
        recom.$save(function(response) {
          $location.path('recommendations/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(recom) {
      if (recom) {
        recom.$remove();

        for (var i in $scope.recoms) {
          if ($scope.recoms[i] === recom) {
            $scope.recoms.splice(i, 1);
          }
        }
      } else {
        $scope.recom.$remove(function(response) {
          $location.path('recommendations');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var recom = $scope.recom;
        if (!recom.updated) {
          recom.updated = [];
        }
        recom.updated.push(new Date().getTime());

        recom.$update(function() {
          $location.path('recommendations/' + recom._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Recoms.query(function(recoms) {
        $scope.recoms = recoms;
      });
    };

    $scope.findOne = function() {
      Recoms.get({
        recomId: $stateParams.recomId
      }, function(recom) {
        $scope.recom = recom;
      });
    };
  }
]);

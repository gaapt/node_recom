'use strict';

angular.module('mean.analyser').controller('MiningController', ['$scope', '$http', '$log', 'Global',
    function($scope, $http, $log, Global) {
        $scope.global = Global;
        $scope.maxSize = 5;
        $scope.getTransitions = null;
        $scope.getSearches = null;
        $scope.getEstimations = null;
        $scope.getCommentations = null;

        $scope.tables = [{
            heading: 'Transitions',
            req: 'transitions',
            collection: $scope.transitions,
            collectionLength: 1,
            curPage: 1,
            promise: $scope.getTransitions,
            fields: [{
                title: 'Time',
                key: 'time'
            }, {
                title: 'Session',
                key: 'session'
            }, {
                title: 'Target URL',
                key: 'targetURL'
            }, {
                title: 'Params',
                key: 'targetParams'
            }]
        }, {
            heading: 'Search queries',
            req: 'searches',
            collection: $scope.searches,
            collectionLength: 1,
            curPage: 1,
            promise: $scope.getSearches,
            fields: [{
                title: 'Time',
                key: 'time'
            }, {
                title: 'Query',
                key: 'query'
            }, {
                title: 'Results',
                key: 'results'
            }]
        }, {
            heading: 'Estimation',
            req: 'estimations',
            collection: $scope.estimations,
            collectionLength: 1,
            curPage: 1,
            promise: $scope.getEstimations,
            fields: [{
                title: 'Time',
                key: 'time'
            }, {
                title: 'Recommendation',
                key: 'recom'
            }, {
                title: 'Mark',
                key: 'mark'
            }]
        }, {
            heading: 'Commentation',
            req: 'commentations',
            collection: $scope.commentations,
            collectionLength: 1,
            curPage: 1,
            promise: $scope.getCommentations,
            fields: [{
                title: 'Time',
                key: 'time'
            }, {
                title: 'Recommendation',
                key: 'recom'
            }, {
                title: 'Mood',
                key: 'mood'
            }]
        }];

        $scope.init = function(index) {
            $scope.tables[index].promise = $http.get('/api/' + $scope.tables[index].req, {
                params: {
                    curPage: $scope.tables[index].curPage
                }
            }).success(function(data) {
                //$log.info(data);
                $scope.tables[index].collection = data[0];
                $scope.tables[index].collectionLength = data[1];
            }).error(function(err) {
                $log.info(err);
            });
        };
    }
]);

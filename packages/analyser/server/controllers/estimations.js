'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    //Recom = mongoose.model('Recom'),
    //Transition = mongoose.model('Transition'),
    //Search = mongoose.model('Search'),
    Estimation = mongoose.model('Estimation'),
    //Commentation = mongoose.model('Commentation'),
    //User = mongoose.model('User'),
    _ = require('lodash');
require('./dateFormat.js');

exports.analyseEstimations = function(req, res, next) {
    var configs = [];
    var searchQuery1 = Estimation
        .aggregate([{
            $group: {
                _id: '$recom',
                count: {
                    $sum: 1
                },
                avgMark: {
                    $avg: '$mark'
                },
                maxMark: {
                    $max: '$mark'
                },
                minMark: {
                    $min: '$mark'
                }
            }
        }, {
            $sort: {
                avgMark: -1,
                count: -1
            }
        }]);

    searchQuery1.exec(function(err, searches) {
        if (err) {
            console.log(err);
        } else {
            var config = {
                options: {
                    chart: {
                        type: 'bar'
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'The maximum mark',
                    data: []
                        //type: 'bar'
                }, {
                    name: 'The average mark',
                    data: []
                        //type: 'bar'
                }, {
                    name: 'The minimum mark',
                    data: []
                        //type: 'bar'
                }],
                title: {
                    text: 'Marks of recommendations'
                },
                xAxis: {
                    categories: []
                },
                loading: false,
                credits: {
                    enabled: false
                },
                size: {}
            };
            Estimation.populate(searches, {
                path: '_id',
                model: 'Recom'
            }, function(err, estimates) {
                _.forEach(estimates, function(e, index) {
                    config.xAxis.categories.push(e._id.title);
                    config.series[0].data.push([e.maxMark]);
                    config.series[1].data.push([e.avgMark]);
                    config.series[2].data.push([e.minMark]);
                });
                configs.push(config);
                return res.jsonp(configs);
            });
        }
    });
};

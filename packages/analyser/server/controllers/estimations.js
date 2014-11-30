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
            _.forEach(searches, function(s, index) {
                config.xAxis.categories.push(s._id);
                config.series[1].data.push([s.maxMark]);
                config.series[0].data.push([s.avgMark]);
                config.series[2].data.push([s.minMark]);
            });
            configs.push(config);
        }
        return res.jsonp(configs);
    });
};

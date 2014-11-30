'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    //Recom = mongoose.model('Recom'),
    Transition = mongoose.model('Transition'),
    //Search = mongoose.model('Search'),
    //Estimation = mongoose.model('Estimation'),
    //Commentation = mongoose.model('Commentation'),
    //User = mongoose.model('User'),
    _ = require('lodash');
require('./dateFormat.js');

exports.analyseTransitions = function(req, res, next) {
    var transQuery = Transition
        .aggregate([{
            $match: {
                targetURL: '/recommendations/:recomId'
            }
        }, {
            $group: {
                _id: '$session',
                transitionsCount: {
                    $sum: 1
                },
                serieData: {
                    $push: {
                        url: '$targetURL',
                        time: '$time',
                        params: '$targetParams'
                    }
                },
                user: {
                    $last: '$user'
                }
            }
        }]);
    transQuery.exec(function(err, transitions) {
        if (err) {
            console.log(err);
        } else {
            var configs = [];
            var config = {
                options: {
                    chart: {
                        type: 'spline',
                        zoomType: 'x'
                    }
                },
                plotOptions: {
                    series: {
                        stacking: ''
                    }
                },
                series: [],
                title: {
                    text: 'Users tracks on recommendations by session'
                },
                useHighStocks: true,
                loading: false,
                credits: {
                    enabled: false
                }
            };
            _.forEach(transitions, function(t, index) {
                var ser = {
                    name: 'Session ' + t._id + ' (user ' + t.user + ')',
                    data: [],
                    tooltip: {
                        valueDecimals: 2
                    },
                    dashStyle: 'Dash',//'LongDashDot',
                    type: 'spline'
                };
                _.forEach(t.serieData, function(pair, index2) {
                    if (typeof pair.params === null || typeof pair.params === 'undefined' || typeof pair.params.recomId === 'undefined') {
                        ser.data.push({
                            x: Date.parse(pair.time), //index2,
                            y: Math.random(),
                            name: new Date(pair.time).format('dd/mm/yyyy HH:MM:ss') + ': ' + '(recommendation was removed)'
                        });
                    } else {
                        ser.data.push({
                            x: Date.parse(pair.time), //index2,
                            y: Math.random(),
                            name: new Date(pair.time).format('dd/mm/yyyy HH:MM:ss') + ': ' + '( recommendation ' + pair.params.recomId + ')'
                        });
                    }
                });
                config.series.push(ser);
            });
            configs.push(config);
            return res.jsonp(configs);
        }
    });
};
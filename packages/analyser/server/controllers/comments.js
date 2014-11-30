'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    //Recom = mongoose.model('Recom'),
    //Transition = mongoose.model('Transition'),
    //Search = mongoose.model('Search'),
    //Estimation = mongoose.model('Estimation'),
    Commentation = mongoose.model('Commentation'),
    //User = mongoose.model('User'),
    _ = require('lodash');
require('./dateFormat.js');

exports.analyseComments = function(req, res, next) {
    var configs = [];
    var searchQuery1 = Commentation
        .aggregate([{
            $group: {
                _id: '$recom',
                count: {
                    $sum: 1
                }
            }
        }, {
            $limit: 10
        }, {
            $sort: {
                count: -1
            }
        }]);

    var searchQuery2 = Commentation
        .aggregate([{
            $group: {
                _id: '$recom',
                count: {
                    $sum: 1
                },
                goodCount: {
                    $sum: {
                        $cond: {
                            if: {
                                $eq: ['$mood', 'good']
                            },
                            then: 1,
                            else: 0
                        }
                    }
                },
                badCount: {
                    $sum: {
                        $cond: {
                            if: {
                                $eq: ['$mood', 'bad']
                            },
                            then: 1,
                            else: 0
                        }
                    }
                }
            }
        }, {
            $sort: {
                count: -1
            }
        }]);

    searchQuery1.exec(function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            var config = {
                options: {
                    chart: {
                        type: 'pie'
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Number of comments',
                    data: []
                        //type: 'bar'
                }],
                title: {
                    text: 'Top-10 of the most commented recommendations'
                },
                loading: false,
                credits: {
                    enabled: false
                },
                size: {}
            };
            _.forEach(comments, function(com, index) {
                config.series[0].data.push([com._id, com.count]);
            });
            configs.push(config);
        }
    }).then(function(h) {
        searchQuery2.exec(function(err, comments) {
            if (err) {
                console.log(err);
            } else {
                var config = {
                    options: {
                        chart: {
                            renderTo: 'container',
                            type: 'bar'
                        }
                    },
                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },
                    series: [{
                        name: 'General number of comments',
                        data: []
                            //type: 'bar'
                    }, {
                        name: 'Number of good comments',
                        data: []
                            //type: 'bar'
                    }, {
                        name: 'Number of bad comments',
                        data: []
                            //type: 'bar'
                    }],
                    title: {
                        text: 'List of comments info'
                    },
                    xAxis: {
                        categories: []
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Number of comments'
                        },
                        stackLabels: {
                            enabled: true,
                            style: {
                                fontWeight: 'bold'
                            }
                        }
                    },
                    loading: false,
                    credits: {
                        enabled: false
                    },
                    size: {}
                };
                _.forEach(comments, function(com, index) {
                    config.xAxis.categories.push(com._id);
                    config.series[0].data.push([com.count]);
                    config.series[1].data.push([com.goodCount]);
                    config.series[2].data.push([com.badCount]);
                });
                configs.push(config);
            }
        }).then(function(h1) {
            return res.jsonp(configs);
        });
    });
};

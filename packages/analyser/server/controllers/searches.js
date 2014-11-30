'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    //Recom = mongoose.model('Recom'),
    //Transition = mongoose.model('Transition'),
    Search = mongoose.model('Search'),
    //Estimation = mongoose.model('Estimation'),
    //Commentation = mongoose.model('Commentation'),
    //User = mongoose.model('User'),
    _ = require('lodash');
require('./dateFormat.js');

function queryToString(query) {
    var queryString = '';
    if (typeof query.keywords !== 'undefined' && query.keywords.trim() !== '')
        queryString += 'Keywords: \"' + query.keywords + '\"';
    if (typeof query.cond_phase !== 'undefined' && query.cond_phase.length > 0)
        queryString += (queryString === '' ? '' : '; ') + 'Phases: \"' + query.cond_phase.join('; ') + '\"';
    if (typeof query.appointment !== 'undefined')
        queryString += (queryString === '' ? '' : '; ') + 'Appointment: \"' + query.appointment + '\"';
    if (typeof query.cond_arch !== 'undefined')
        queryString += (queryString === '' ? '' : '; ') + 'Architecture: \"' + query.cond_arch + '\"';
    if (typeof query.tags !== 'undefined' && query.tags.length > 0)
        queryString += (queryString === '' ? '' : '; ') + 'Tags: \"' + query.tags + '\"';
    return queryString;
}

exports.analyseSearches = function(req, res, next) {
    var configs = [];
    var searchQuery1 = Search
        .aggregate([{
            $group: {
                _id: '$query',
                query: {
                    $last: '$query'
                },
                count: {
                    $sum: 1
                },
                serieData: {
                    $push: {
                        results: '$results'
                            //time: '$time'
                    }
                },
                user: {
                    $last: '$user'
                }
            }
        }, {
            $limit: 10
        }, {
            $sort: {
                count: -1
            }
        }]);

    var searchQuery2 = Search
        .aggregate([{
            $match: {
                $and: [{
                    results: {
                        $exists: true
                    }
                }, {
                    results: {
                        $not: {
                            $size: 0
                        }
                    }
                }]
            }
        }, {
            $group: {
                _id: '$query',
                query: {
                    $last: '$query'
                },
                count: {
                    $sum: 1
                },
                serieData: {
                    $push: {
                        results: '$results'
                    }
                },
                user: {
                    $last: '$user'
                },
                resSize: {
                    $sum: {
                        $size: '$results'
                    }
                }
            }
        }, {
            $limit: 10
        }, {
            $sort: {
                resSize: -1
            }
        }]);

    var searchQuery3 = Search
        .aggregate([{
            $match: {
                $or: [{
                    results: {
                        $exists: false
                    }
                }, {
                    results: {

                        $size: 0

                    }
                }]
            }
        }, {
            $group: {
                _id: '$query',
                query: {
                    $last: '$query'
                },
                count: {
                    $sum: 1
                },
                user: {
                    $last: '$user'
                }
            }
        }, {
            $limit: 10
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
                            type: 'pie'
                        }
                    },
                    plotOptions: {
                        series: {
                            stacking: ''
                        }
                    },
                    series: [{
                        name: 'Number of requests',
                        data: [],
                        type: 'pie'
                    }],
                    title: {
                        text: 'Top-10 popular queries'
                    },
                    loading: false,
                    credits: {
                        enabled: false
                    }
                };
                _.forEach(searches, function(s, index) {
                    config.series[0].data.push([queryToString(s.query), s.count]);
                });
                configs.push(config);
            }
        })
        .then(function(h) {
            //console.log('then1', h);
            searchQuery2.exec(function(err, searches) {
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
                                    stacking: ''
                                }
                            },
                            series: [{
                                name: 'Number of results',
                                data: [],
                                type: 'pie'
                            }],
                            title: {
                                text: 'Successfull queries with the greatest number of results'
                            },
                            loading: false,
                            credits: {
                                enabled: false
                            }
                        };
                        _.forEach(searches, function(s, index) {
                            config.series[0].data.push([queryToString(s.query), s.resSize]);
                        });
                        configs.push(config);
                    }
                })
                .then(function(h1) {
                    //console.log('then2', h1);
                    searchQuery3.exec(function(err, searches) {
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
                                        stacking: ''
                                    }
                                },
                                series: [{
                                    name: 'Number of results',
                                    data: [],
                                    type: 'pie'
                                }],
                                title: {
                                    text: 'The most frequent unsuccessfull queries'
                                },
                                loading: false,
                                credits: {
                                    enabled: false
                                }
                            };
                            _.forEach(searches, function(s, index) {
                                config.series[0].data.push([queryToString(s.query), s.count]);
                            });
                            configs.push(config);
                        }
                    }).then(function(h2) {
                        //console.log('then3', h2);
                        return res.jsonp(configs);
                    });
                });
        });
};

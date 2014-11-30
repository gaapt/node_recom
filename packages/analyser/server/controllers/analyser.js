'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    //Recom = mongoose.model('Recom'),
    Transition = mongoose.model('Transition'),
    Search = mongoose.model('Search'),
    Estimation = mongoose.model('Estimation'),
    Commentation = mongoose.model('Commentation');
    //User = mongoose.model('User'),
    //_ = require('lodash');

exports.createTransition = function(req, res) {
    if (!req.body)
        return res.status(500).send('Empty request');
    var transition = req.body;
    transition.user = req.user._id;
    transition.session = req.sessionID;
    var trans = new Transition(transition);
    trans.save(function(err) {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.jsonp(trans);
        }
    });
};

exports.transitions = function(req, res) {
    if (!req.query || !req.query.curPage)
        return res.status(500).send('Empty request');
    var page = req.query.curPage;
    Transition
        .find({})
        .skip((page - 1) * 5)
        .limit(5)
        //.populate('user')
        .sort({
            time: -1,
            session: 1
        })
        .exec(function(err, transitions) {
            if (err) {
                return res.status(500).send(err);
            } else {
                Transition.count({}, function(err, count) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        return res.jsonp([transitions, count]);
                        /*var result = _.chain(transitions)
                            .groupBy('session')
                            .pairs()
                            .map(function(currentItem) {
                                return _.object(_.zip(['session', 'transitions'], currentItem));
                            })
                            .value();
                        return res.jsonp(result);*/
                    }
                });
            }
        });

};

exports.searches = function(req, res) {
    if (!req.query || !req.query.curPage)
        return res.status(500).send('Empty request');
    var page = req.query.curPage;
    Search
        .find({})
        .skip((page - 1) * 5)
        .limit(5)
        //.populate('user')
        .sort({
            time: -1,
            session: 1
        })
        .exec(function(err, searches) {
            if (err) {
                return res.status(500).send(err);
            } else {
                Search.count({}, function(err, count) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        return res.jsonp([searches, count]);
                    }
                });
            }
        });

};

exports.estimations = function(req, res) {
    if (!req.query || !req.query.curPage)
        return res.status(500).send('Empty request');
    var page = req.query.curPage;
    Estimation
        .find({})
        .skip((page - 1) * 5)
        .limit(5)
        //.populate('user')
        .sort({
            time: -1,
            session: 1
        })
        .exec(function(err, estimations) {
            if (err) {
                return res.status(500).send(err);
            } else {
                Estimation.count({}, function(err, count) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        return res.jsonp([estimations, count]);
                    }
                });
            }
        });

};

exports.commentations = function(req, res) {
    if (!req.query || !req.query.curPage)
        return res.status(500).send('Empty request');
    var page = req.query.curPage;
    Commentation
        .find({})
        .skip((page - 1) * 5)
        .limit(5)
        //.populate('user')
        .sort({
            time: -1,
            session: 1
        })
        .exec(function(err, commentations) {
            if (err) {
                return res.status(500).send(err);
            } else {
                Commentation.count({}, function(err, count) {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        return res.jsonp([commentations, count]);
                    }
                });
            }
        });

};
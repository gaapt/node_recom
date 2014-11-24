'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Transition = mongoose.model('Transition');
//_ = require('lodash');

exports.createTransition = function (req, res) {
	if(!req.body) 
		return res.status(500).send('Empty request');
	var transition = req.body;
	transition.user = req.user._id;
	transition.session = req.sessionID;
	var trans = new Transition(transition);
	trans.save(function(err) {
		if(err) {
			return res.status(500).send(err);
		} else {
			return res.jsonp(trans);
		}
	});
};
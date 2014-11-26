'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
//Recom = mongoose.model('Recom'),
Feedback = mongoose.model('Feedback'),
Commentation = mongoose.model('Commentation');
//_ = require('lodash');

exports.create = function (req, res) {
	var feedback = new Feedback(req.body);
	feedback.author = req.user._id;
	feedback.when = new Date();

	feedback.save(function (err) {
		if (err) {
			console.log(err);
			return res.status(500).json({
				error : 'Cannot save the feedback'
			});
		}
		res.json(feedback);
		new Commentation({
			user : req.user._id,
			recom : feedback.rec,
			mood : feedback.mood
		}).save(function (err) {
			if (err)
				console.log(err);
			else
				console.log('commentation analyser info inserted');
		});
	});
};

exports.feedbacks = function (req, res) {
	if (!req.query.recId) {
		return res.status(500).send('Empty request');
	}
	Feedback
	.find({
		rec : req.query.recId
	})
	.populate('author')
	.exec(function (err, feedbacks) {
		if (err) {
			return res.status(500).send(err);
		} else {
			return res.jsonp(feedbacks);
		}
	});
};

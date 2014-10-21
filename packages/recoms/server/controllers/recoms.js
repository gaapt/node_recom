'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Recom = mongoose.model('Recom'),
Mark = mongoose.model('Mark'),
_ = require('lodash');

/**
 * Find recommendation by id
 */
exports.recom = function (req, res, next, id) {
	Recom.load(id, function (err, recom) {
		if (err)
			return next(err);
		if (!recom)
			return next(new Error('Failed to load recommendation ' + id));
		req.recom = recom;
		next();
	});
};

/**
 * Create an recommendation
 */
exports.create = function (req, res) {
	var recom = new Recom(req.body);
	recom.user = req.user;
	recom.cond_tech = _.map(recom.cond_tech, 'text');

	recom.save(function (err) {
		if (err) {
			console.log(err);
			return res.status(500).json({
				error : 'Cannot save the recommendation'
			});
		}
		res.json(recom);

	});
};

/**
 * Update an recommendation
 */
exports.update = function (req, res) {
	var recom = req.recom;

	recom = _.extend(recom, req.body);

	recom.save(function (err) {
		if (err) {
			return res.json(500, {
				error : 'Cannot update the recommendation'
			});
		}
		res.json(recom);

	});
};

/**
 * Delete an recommendation
 */
exports.destroy = function (req, res) {
	var recom = req.recom;

	recom.remove(function (err) {
		if (err) {
			return res.json(500, {
				error : 'Cannot delete the recommendation'
			});
		}
		res.json(recom);

	});
};

/**
 * Show an recommendation
 */
exports.show = function (req, res) {
	res.json(req.recom);
};

/**
 * List of recommendations
 */
exports.all = function (req, res) {
	Recom.find().sort('-created').populate('user', 'name username').exec(function (err, articles) {
		if (err) {
			return res.json(500, {
				error : 'Cannot list the recommendations'
			});
		}
		res.json(articles);

	});
};

exports.setMark = function (req, res) {
	Mark
	.findOne({
		rec : req.query.recId,
		who_set : req.user._id
	})
	.exec(function (err, m) {
		if (err) {
			return res.json(500, {
				error : err
			});
		}
		if (!m) {
			var mark = new Mark();
			mark.rec = req.query.recId;
			mark.who_set = req.user._id;
			mark.what_set = req.query.mark;
			mark.save(function (err) {
				if (err) {
					console.log(err);
					return res.status(500).json({
						error : 'Cannot set the mark'
					});
				}
				res.jsonp(mark);
			});
		}
		if (m) {
			Mark
			.update({
				_id : m._id,
				who_set : req.user._id
			}, {
				$set : {'what_set' : req.query.mark}
			})
			.exec(function (err) {
				if(err) {
					return res.json(500, {
						error : err
					});
				}
				res.jsonp(m);
			});
		}
	});

};

exports.getMark = function (req, res) {
	var recId = req.query.recId;
	if (recId === '') {
		res.status(400).send('Invalid URI');
		return;
	}
	Mark
	.findOne({
		rec : recId,
		who_set : req.user._id
	}, {
		'what_set' : 1
	})
	.exec(function (err, mark) {
		if (err) {
			return res.json(500, {
				error : err
			});
		}
		if (!mark) {
			return res.json('');
		}
		res.jsonp(mark.what_set);
	});
};

exports.getRate = function (req, res) {
	var recId = req.query.recId;
	Mark
	.aggregate({ 
		'$group': {
			'_id': '$rec', 
			'rate': { '$avg': '$what_set' } 
		} 
	})
	.exec(function (err, mark) {
		if (err) {
			return res.json(500, {
				error : err
			});
		}
		if (!mark) {
			return res.json('');
		}
		var rm = _.find(mark, function(chr) {		
			return chr._id.toString() === recId;
		});
		if(!rm) {
			return res.json('');
		}
		res.jsonp(rm.rate);
	});
};

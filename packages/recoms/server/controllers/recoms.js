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

exports.getRecom = function (req, res) {
	var recId = req.query.recId;
	if(!recId) {
		res.render('error', {
			status : 500
		});
	}
	Recom
	.findById(recId)
	.populate('user')
	.lean()
	.exec(function (err, recom) {
		if (err) {
			console.log(err);
			res.render('error', {
				status : 500
			});
		}
		if (!recom) {
			return res.jsonp('empty result');
		}
		recom.user = {_id : recom.user._id, name : recom.user.name};
		res.jsonp(recom);
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
			console.log(err);
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
	Recom.find().sort('-created').populate('user', 'name username').exec(function (err, recoms) {
		if (err) {
			return res.json(500, {
				error : 'Cannot list the recommendations'
			});
		}
		res.json(recoms);
	});
};

exports.allWithMarks = function (req, res) {
	Recom.find().sort('-created').populate('user', 'name username').lean().exec(function (err, recoms) {
		if (err) {
			return res.json(500, {
				error : 'Cannot list the recommendations'
			});
		}
		_.forEach(recoms, function(item, index) {
			var recId = item._id;
			Mark
			.aggregate({ 
				'$group': {
					'_id': '$rec', 
					'rate': { '$avg': '$what_set' } 
				}
			}, {
				'$match': {
					'_id': recId
				}
			})
			.exec(function (err, recs) {
				if (err) {
					return res.json(500, {
						error : err
					});
				}
				if(recs.length === 0)
					_.assign(item, { 'rate' : 0 });
				else
					_.assign(item, { 'rate' : recs[0].rate });
				if (index === recoms.length-1) {						
					res.json(recoms);
				}
			});
		});
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
			return res.json(0);
		}
		res.jsonp(mark.what_set);
	});
};

exports.getRate = function (req, res) {
	var ObjectId = mongoose.Types.ObjectId; 
	var recId = new ObjectId(req.query.recId);
	Mark
	.aggregate({ 
		'$group': {
			'_id': '$rec', 
			'rate': { '$avg': '$what_set' } 
		}
	}, {
		'$match': {
			'_id': recId
		}
	})
	.exec(function (err, mark) {
		if (err) {
			return res.json(500, {
				error : err
			});
		}
		if (!mark) {
			return res.jsonp(0);
		}
		res.jsonp(mark.length === 0 ? 0 : mark[0].rate);
	});
};

exports.findRecoms = function (req, res) {
	var searchQuery = req.body.search;
	if(!searchQuery) {
		res.render('error', {
			status : 500
		});
	}
	Recom
	.find({})
	.or([
		{'title' : {'$regex': searchQuery.keywords}},
		{'author' : {'$regex': searchQuery.keywords}},
		{'content' : {'$regex': searchQuery.keywords}}
	])
	.exec(function(err, recoms) {
		if(err) {
			res.render('error', {
				status : 500
			});
		}
		res.jsonp(recoms);
	});
};

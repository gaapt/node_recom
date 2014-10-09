'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Recom = mongoose.model('Recom'),
  _ = require('lodash');


/**
 * Find recommendation by id
 */
exports.recom = function(req, res, next, id) {
  Recom.load(id, function(err, recom) {
    if (err) return next(err);
    if (!recom) return next(new Error('Failed to load recommendation ' + id));
    req.recom = recom;
    next();
  });
};

/**
 * Create an recommendation
 */
exports.create = function(req, res) {
  var recom = new Recom(req.body);
  recom.user = req.user;

  recom.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the recommendation'
      });
    }
    res.json(recom);

  });
};

/**
 * Update an recommendation
 */
exports.update = function(req, res) {
  var recom = req.recom;

  recom = _.extend(recom, req.body);

  recom.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the recommendation'
      });
    }
    res.json(recom);

  });
};

/**
 * Delete an recommendation
 */
exports.destroy = function(req, res) {
  var recom = req.recom;

  recom.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the recommendation'
      });
    }
    res.json(recom);

  });
};

/**
 * Show an recommendation
 */
exports.show = function(req, res) {
  res.json(req.recom);
};

/**
 * List of recommendations
 */
exports.all = function(req, res) {
  Recom.find().sort('-created').populate('user', 'name username').exec(function(err, articles) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the recommendations'
      });
    }
    res.json(articles);

  });
};

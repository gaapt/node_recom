'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Feedback Schema
 */
var FeedbackSchema = new Schema({
  mood : {
	type: String
  },
  when : {
    type: Date,
    default: Date.now
  },
  rec: {
    type: Schema.ObjectId,
    ref: 'Recom'
  },
  author: {
	type: Schema.ObjectId,
	ref: 'User'
  },
  comment: {
	type: String
  }
});

mongoose.model('Feedback', FeedbackSchema);
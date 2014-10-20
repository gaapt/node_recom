'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mark Schema
 */
var MarkSchema = new Schema({
  when_set: {
    type: Date,
    default: Date.now
  },
  rec: {
    type: Schema.ObjectId,
    ref: 'Recom'
  },
  who_set: {
	type: Schema.ObjectId,
	ref: 'User'
  },
  what_set: {
	type: Number,
	min: 0,
	max: 10,
	required: true
  }
});

/**
 * Validations
*/
 
MarkSchema.path('what_set').validate(function(mark) {
  return !!mark;
}, 'Mark cannot be blank');

mongoose.model('Mark', MarkSchema);

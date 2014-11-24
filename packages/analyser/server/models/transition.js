'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * Transition Schema
 */
var TransitionSchema = new Schema({
		user : {
			type : Schema.ObjectId,
			ref : 'User',
			required : true
		},
		time : {
			type : Date,
			default : Date.now
		},
		targetURL : {
			type : String,
			required : true
		},
		prevURL : {
			type : String
		},
		session : {
			type : String,
			required : true
		}
	});

mongoose.model('Transition', TransitionSchema);
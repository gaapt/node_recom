'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * Estimation Schema
 */
var EstimationSchema = new Schema({
		user : {
			type : Schema.ObjectId,
			ref : 'User',
			required : true
		},
		time : {
			type : Date,
			default : Date.now
		},
		mark : {
			type : String,
			required : true
		}
	});

mongoose.model('Estimation', EstimationSchema);
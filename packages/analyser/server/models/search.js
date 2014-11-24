'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * Search Schema
 */
var SearchSchema = new Schema({
		user : {
			type : Schema.ObjectId,
			ref : 'User',
			required : true
		},
		time : {
			type : Date,
			default : Date.now
		},
		query : {
			type : Schema.Types.Mixed,
			required : true
		},
		results : {
			type : Array,
			required : true
		}
	});

mongoose.model('Search', SearchSchema);
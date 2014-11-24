'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * Commentation Schema
 */
var CommentationSchema = new Schema({
		user : {
			type : Schema.ObjectId,
			ref : 'User',
			required : true
		},
		time : {
			type : Date,
			default : Date.now
		},
		mood : {
			type : String,
			required : true
		}
	});

mongoose.model('Commentation', CommentationSchema);
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

/**
 * Recommendation Schema
 */
var RecomSchema = new Schema({
		created : {
			type : Date,
		default:
			Date.now
		},
		title : {
			type : String,
			required : true,
			trim : true
		},
		author : {
			type : String,
			required : true,
			trim : true
		},
		appointment : {
			type : String,
			required : true,
			trim : true
		},
		cond_phases : {
			type : Array,
			required : true
		},
		cond_arch : {
			type : String,
			required : false
		},
		cond_tech : {
			type : Array,
			required : false
		},
		req_resources : {
			type : Array,
			trim : true
		},
		consequences_use : {
			type : String,
			trim : true
		},
		consequences_noneuse : {
			type : String,
			trim : true
		},
		friend_recoms : {
			type : Array
		},
		tags : {
			type : Array
		},
		content : {
			type : String,
			required : true,
			trim : true
		},
		user : {
			type : Schema.ObjectId,
			ref : 'User'
		}
	});

/**
 * Validations
 */
RecomSchema.path('title').validate(function (title) {
	return !!title;
}, 'Title cannot be blank');

RecomSchema.path('content').validate(function (content) {
	return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
RecomSchema.statics.load = function (id, cb) {
	this.findOne({
		_id : id
	}).populate('user', 'name username').exec(cb);
};

mongoose.model('Recom', RecomSchema);

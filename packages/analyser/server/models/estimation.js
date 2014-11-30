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
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    recom: {
        type: Schema.ObjectId,
        ref: 'Recom',
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    mark: {
        type: Number,
        min: 0,
        max: 10,
        required: true
    }
});

mongoose.model('Estimation', EstimationSchema);

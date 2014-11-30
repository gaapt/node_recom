'use strict';

var analyser = require('../controllers/analyser.js'),
    transAnayser = require('../controllers/transitions.js'),
    searchAnalyser = require('../controllers/searches.js'),
    estimAnalyser = require('../controllers/estimations.js'),
    commAnalyser = require('../controllers/comments.js');

// The Package is past automatically as first parameter
module.exports = function(Analyser, app, auth, database) {
    app.route('/api/transition')
        .post(auth.requiresLogin, analyser.createTransition);
    app.route('/api/transitions')
        .get(auth.requiresAdmin, analyser.transitions);
    app.route('/api/searches')
        .get(auth.requiresAdmin, analyser.searches);
    app.route('/api/estimations')
        .get(auth.requiresAdmin, analyser.estimations);
    app.route('/api/commentations')
        .get(auth.requiresAdmin, analyser.commentations);
    app.route('/api/analyseTransitions')
        .get(auth.requiresAdmin, transAnayser.analyseTransitions);
    app.route('/api/analyseSearches')
        .get(auth.requiresAdmin, searchAnalyser.analyseSearches);
    app.route('/api/analyseEstimations')
        .get(auth.requiresAdmin, estimAnalyser.analyseEstimations);
    app.route('/api/analyseComments')
        .get(auth.requiresAdmin, commAnalyser.analyseComments);
};

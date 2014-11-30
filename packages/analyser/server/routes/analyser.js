'use strict';

var analyser = require('../controllers/analyser.js');
var transAnayser = require('../controllers/transitions.js');
var searchAnalyser = require('../controllers/searches.js');

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
};

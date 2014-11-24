'use strict';

var analyser = require('../controllers/analyser.js');

// The Package is past automatically as first parameter
module.exports = function (Analyser, app, auth, database) {
	app.route('/api/transition')
	.post(auth.requiresLogin, analyser.createTransition);
};
'use strict';


var mean = require('meanio');

mean.serve({ /*formal options*/ }, function(app, config) {
	var port = config.https && config.https.port ? config.https.port : config.http.port;
	console.log('Mean app started on port ' + port + ' (' + process.env.NODE_ENV + ')');
});

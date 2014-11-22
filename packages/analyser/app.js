'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Analyser = new Module('analyser');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Analyser.register(function (app, auth, database) {

	//We enable routing. By default the Package Object is passed to the routes
	Analyser.routes(app, auth, database);

	//We are adding a link to the main menu for all authenticated users
	/*Analyser.menus.add({
	title: 'analyser example page',
	link: 'analyser example page',
	roles: ['authenticated'],
	menu: 'main'
	});*/

	Analyser.angularDependencies(['textAngular']);
	Analyser.aggregateAsset('css', 'analyser.css');
	Analyser.aggregateAsset('css', 'bower_components/textAngular/src/textAngular.css');

	return Analyser;
});

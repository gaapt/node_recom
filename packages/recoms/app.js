'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Recoms = new Module('recoms');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Recoms.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Recoms.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Recoms.menus.add({
    'roles': ['authenticated'],
    'title': 'Recommendations',
    'link': 'all recommendations'
  });
  Recoms.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New',
    'link': 'create recommendation'
  });
  Recoms.menus.add({
    'roles': ['authenticated'],
    'title': 'Find',
    'link': 'find recommendation'
  });

  Recoms.aggregateAsset('css', 'recoms.css');

  return Recoms;
});

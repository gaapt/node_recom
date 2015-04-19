'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanUser = new Module('users');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanUser.register(function(app, auth, passport, database) {

  //We enable routing. By default the Package Object is passed to the routes
  MeanUser.routes(app, auth, database, passport);

  MeanUser.aggregateAsset('js', 'meanUser.js');
 
  return MeanUser;
});

'use strict';

/**
 * Module dependencies.
 */
var mean = require('meanio'),
  compression = require('compression'),
  morgan = require('morgan'),
  consolidate = require('consolidate'),
  cookieParser = require('cookie-parser'),
  expressValidator = require('express-validator'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  assetmanager = require('assetmanager'),
  session = require('express-session'),
  mongoStore = require('connect-mongostore')(session),
  helpers = require('view-helpers'),
  flash = require('connect-flash'),
  config = mean.loadConfig();

module.exports = function(app, passport, db) {

  app.set('showStackError', true);

  // Prettify HTML
  app.locals.pretty = true;

  // cache=memory or swig dies in NODE_ENV=production
  app.locals.cache = 'memory';

  // Should be placed before express.static
  // To ensure that all assets and data are compressed (utilize bandwidth)
  app.use(compression({
    level: 9
  }));

  // Only use logger for development environment
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // assign the template engine to .html files
  app.engine('html', consolidate[config.templateEngine]);

  // set .html as the default extension
  app.set('view engine', 'html');

  // The cookieParser should be above session
  app.use(cookieParser());

  // Request body parsing middleware should be above methodOverride
  app.use(expressValidator());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(methodOverride());

  // Import the assets file and add to locals
  var assets = assetmanager.process({
    assets: require('./assets.json'),
    debug: process.env.NODE_ENV !== 'production',
    webroot: /public\/|packages\//g
  });

  // Add assets to local variables
  app.use(function(req, res, next) {
    res.locals.assets = assets;

    mean.aggregated('js', 'header', function(data) {
      res.locals.headerJs = data;
      next();
    });
  });

  // Express/Mongo session storage
  app.use(session({
    secret: config.sessionSecret,
    store: new mongoStore({
      db: '<yourdb>',
      host: '<yourhost>',
      port: 27017,
      username: '<yourusername>',
      password: '<yourpassword>',
      collection: config.sessionCollection,
      auto_reconnect: true
    }),
    cookie: config.sessionCookie,
    //name: config.sessionName,
    resave: true,
    saveUninitialized: true
  }));

  // Dynamic helpers
  app.use(helpers(config.app.name));

  // Use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  //mean middleware from modules before routes
  app.use(mean.chainware.before);

  // Connect flash for flash messages
  app.use(flash());
};

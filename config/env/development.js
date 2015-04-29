'use strict';

module.exports = {
  db: '<yourdb>',
  mongoose: {
    debug: true
  },
  app: {
    name: 'Base of Recommendations'
  },
  facebook: {
    clientID: '<yourid>',
    clientSecret: '<yoursecret>',
    callbackURL: 'http://serv.8-0.info/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://serv.8-0.info/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://serv.8-0.info/auth/github/callback'
  },
  google: {
    clientID: '<yourid>',
    clientSecret: '<yoursecret>',
    callbackURL: 'http://serv.8-0.info/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://serv.8-0.info/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', 
  mailer: {
    service: 'SERVICE_PROVIDER',
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};

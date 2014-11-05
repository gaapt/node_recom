'use strict';

module.exports = {
  db: 'mongodb://Nikita:65536@23.252.108.196:27017/recbase',
  mongoose: {
    debug: true
  },
  app: {
    name: 'Base Recommendations'
  },
  facebook: {
    clientID: '915768598451160',
    clientSecret: 'fb0865533ae0572940452db00c8ca1cb',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: '937308274165-9sdnsioc65tl7uceai0kg520u7t3pghu.apps.googleusercontent.com',
    clientSecret: 'Cxlr6FZOoupN3ekdTlF2zzq2',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER', // Gmail, SMTP
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};

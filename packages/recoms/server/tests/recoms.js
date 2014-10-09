'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Recom = mongoose.model('Recom');

/**
 * Globals
 */
var user;
var recom;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Recommendation:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        recom = new Recom({
          title: 'Recommendation Title',
          content: 'Recommendation Content',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return recom.save(function(err) {
          should.not.exist(err);
          recom.title.should.equal('Recommendation Title');
          recom.content.should.equal('Recommendation Content');
          recom.user.should.not.have.length(0);
          recom.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without title', function(done) {
        recom.title = '';

        return recom.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without content', function(done) {
        recom.content = '';

        return recom.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        recom.user = {};

        return recom.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      recom.remove();
      user.remove();
      done();
    });
  });
});

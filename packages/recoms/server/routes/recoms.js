'use strict';

var recoms = require('../controllers/recoms');

// Recommendation authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.recom.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Articles, app, auth) {

  app.route('/recommendations')
    .get(recoms.all)
    .post(auth.requiresLogin, recoms.create);
  app.route('/recommendations/:recomId')
    .get(recoms.show)
    .put(auth.requiresLogin, hasAuthorization, recoms.update)
    .delete(auth.requiresLogin, hasAuthorization, recoms.destroy);
  app.route('/api/getRate').get(auth.requiresLogin, hasAuthorization, recoms.getRate);
  app.route('/api/getMark').get(auth.requiresLogin, hasAuthorization, recoms.getMark);
  app.route('/api/setMark').get(auth.requiresLogin, hasAuthorization, recoms.setMark);

  // Finish with setting up the recomId param
  app.param('recomId', recoms.recom);
};

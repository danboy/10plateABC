var express = require('express'),
  controllers = require('tenplate').controllers(),
  router = express.Router();

router
  .route('/')
  .get(controllers.Home.index);

router
  .route('/auth')
  .post(controllers.Auth.authenticate);

module.exports = router;

var express = require('express'),
  controllers = require('tenplate').controllers(),
  router = express.Router();

router
  .use(controllers.Auth.protect);

router
  .route('/users')
  .post(controllers.Users.create)
  .get(controllers.Users.index);

router
  .route('/layers')
  .post(controllers.Layers.create)
  .get(controllers.Layers.index);

router
  .route('/tests')
  .post(controllers.Tests.create)
  .get(controllers.Tests.index);

router
  .route('/tests/list/:id')
  .post(controllers.Tests.list);

router
  .route('/js/:id.js')
  .get(controllers.Javascript.show )

router
  .route('/metrics')
  .post(controllers.Metrics.create)
  .get(controllers.Metrics.index);

module.exports = router;

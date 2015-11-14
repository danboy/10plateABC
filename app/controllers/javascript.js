var Test = require('../models/test.js')
  , config = require('../../config/hosts.js');
module.exports = {
  show: function(req, res){
    var env = process.env.NODE_ENV || 'development';
    Test.find({'group': req.params.id},function(err,data){
      res.setHeader('Content-Type', 'text/javascript');
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.render('js/main', {group: req.params.id, tests: data , host: config[env].host, token: req.query.token});
    });
  }
}

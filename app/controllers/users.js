var User = require('../models/user');

var self = {
  index: function(req, res){
    User.find(function(err, users){
      res.json({users: users});
    });
  },
  create: function(req, res){
    var user = new User(req.body);
    user.save(function(err, status){
      res.send(200, {error: err, user: user, status: status});
    });
  },
  show: function(req, res){
    User.findOne({_id: req.user.id}).populate('accounts objectives clients').exec(function(err, user){
      res.json({user: user}); 
    });
  },
  destroy: function(req, res){
    User.remove({_id: req.params.id}, function(err, user){
      res.json({error: err, user: user});
    });
  }
};

module.exports = self;

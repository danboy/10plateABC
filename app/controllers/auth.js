var User = require('../models/user');
var jwt    = require('jsonwebtoken');
var crypto = require('bcrypt');
var secret = require('../../config/secret').value;

var self = {
  authenticate: function(req, res){
    User.findOne({
      email: req.body.email
    }, function(err, user){
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      if(!req.body.password){
        res.json({ succcess: false, message: "Password is required"});
      }
      // check if password matches
      if (user.salted_pass != crypto.hashSync(req.body.password, user.salt)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, secret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    } 
    });
  },
  protect: function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
      });

    }
  }
};

module.exports = self;

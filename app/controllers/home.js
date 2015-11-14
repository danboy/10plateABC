var express = require('express');
var router = express.Router();

/* GET home page. */
var self = {
  index: function(req, res, next) {
    res.render('index', { title: '10plate' });
  }
};

module.exports = self;

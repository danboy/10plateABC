var Test = require('../models/test.js');

var self = {
  index: function(req, res){
    Test.find(function(err, tests){
      res.send(tests);
    });
  },
  create:  function(req, res) {
    var test = new Test(req.body)
    test.save(function(err, data){
      if(err){
        res.send(err);
      }else{
        res.send(data);
      }
    });
  },
  list: function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Test.find({'group': req.params.id, 'current_status': 1}, function(err,data){
      console.log(err, data, req.params.id);
      var tests = [];
      data.forEach(function(test,index){
        tests[index] = {name: test.name,layer: test.layer, buckets: test.buckets, variants: test.variants , goal: test.goal }
      });
      res.send(tests);
    });
  }
}

module.exports = self;

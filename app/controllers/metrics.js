var Metric = require('../models/metric.js');

var Metrics = {
  index: function(req, res){
    var metric = Metric.find(function(err,docs){
      if(err){docs = err}
      res.send(docs)
    });
  }
, create:  function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var metric = new Metric({
        name: req.body.name
      , data: JSON.stringify(req.body.data)
      , headers: JSON.stringify(req.headers)
      , group: req.body.group
      , goal: req.body.goal
      , ip: req.ip
      , user: req.body.user})
    metric.save(function(err, data){
      if(err){
        res.send(err+'\n');
      }else{
        res.send(data+'\n');
      }
    });
  }
}

module.exports = Metrics;

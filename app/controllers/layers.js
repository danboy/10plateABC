var Layer = require('../models/layer.js');
module.exports = {
  index: function(req,res){
    Layer.find(function(err,layers){
      res.send(layers);
    })
  },
  create: function(req, res){
    var layer = new Layer(req.body);
    layer.save(function(err, status){
      res.json({error: err, status: status, layer: layer});
    });
  }
};

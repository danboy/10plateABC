var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , layerSchema = new Schema({
    date: {type: Date, default: Date.now}
  , name: {type: String}
  , group: String
  , current_status: { type: Number, default: 0}
  });
 
module.exports = mongoose.model('Layer', layerSchema);

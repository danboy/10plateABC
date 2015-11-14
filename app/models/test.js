var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , testSchema = new Schema({
    layer: String
  , date: {type: Date, default: Date.now}
  , name: {type: String}
  , group: String
  , goal: String
  , selector: String
  , data: {}
  , variants: [{
      name: String
    , template: String
  }]
  , buckets: []
  , current_status: { type: Number, default: 0}
  });
 
module.exports = mongoose.model('Test', testSchema);

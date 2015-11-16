var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId,
  metricSchema = new Schema({
    date: {type: Date, default: Date.now},
    name: {type: String},
    headers: String,
    data: String,
    group: String,
    goal: String,
    user: String,
    ip: String
  });
 
module.exports = mongoose.model('Metric', metricSchema);

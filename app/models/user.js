var mongoose = require('mongoose'),
    crypto = require('bcrypt'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    userSchema = new Schema({
      date: {type: Date, default: Date.now},
      name: {type: String},
      email: {type: String, unique: true, required: true},
      roles: {type: Array, default: 'user'},
      salt: String,
      salted_pass: String,
      resetPasswordToken: String,
      resetPasswordExpires: Date
  });

userSchema.pre('save', function(next) {
  this.hashPassword();
  next();
});

userSchema.methods.authenticate = function(candidatePassword, cb) {
  crypto.compare(candidatePassword, this.salted_pass, function(err, isMatch) {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

userSchema.methods.generateResetToken = function(expires, cb) {
  var user = this;
  require('crypto').randomBytes(12, function(ex, buf) {
    user.resetPasswordToken = buf.toString('hex');
    user.resetPasswordExpires = setResetExpiration(new Date(), expires);
    user.save(function(err, resp){
      if(err){throw err;}
      cb(resp);
    });
  });
};

userSchema.methods.hashPassword = function() {
  // only hash the salted_pass if it has been modified (or is new)
  if (!this.isModified('salted_pass')){return false;}

  // generate a salt
  this.salt = crypto.genSaltSync(10);
  this.salted_pass = crypto.hashSync(this.salted_pass,this.salt);
};

userSchema.methods.checkToken = function(token) {
  return (this.resetPasswordExpires > new Date() && this.resetPasswordToken === token) ? true : false;
};

userSchema.methods.clearResetToken = function(token) {
  this.resetPasswordToken = null, this.resetPasswordExpires = null;
};

var setResetExpiration = function(date, hours){
  date.setHours(date.getHours()+hours);
  return date;
};

module.exports = mongoose.model('User', userSchema);

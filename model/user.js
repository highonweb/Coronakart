const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  usertype: String,
  name: String,
  email: {type: String, unique: true},
  products: [{}],
  history: [
    {
      date: Date,
      purchase: String,
    },
  ],
  password: String,
});
// Compile model from schema

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({email: username}).exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    });
  });
};

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model('user', UserSchema);
module.exports = User;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Item = require('./item.js');
const UserSchema = new Schema({
  usertype: String,
  name: String,
  email: {type: String, unique: true},
  products: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Item,
      },
    ],
  },
  history: [
    {
      date: {type: Date, default: Date.now()},
      stype: {type: String},
      pro: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'stype',
      },
    },
  ],
  password: String,
});
// Compile model from schema

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({email: username}).exec(function (err, user) {
    console.log(username, password);
    if (err) {
      return callback(err);
    } else if (!user) {
      console.log('uskey');
      let err = new Error('User not found.');
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

// hashing a password before saving it to the database

const User = mongoose.model('User', UserSchema);
module.exports = User;

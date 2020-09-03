const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  usertype: String,
  name: String,
  username: String,
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
const user = mongoose.model('user', userSchema);
module.exports = user;

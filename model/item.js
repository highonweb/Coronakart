const mongoose = require('mongoose');
const User = require('./user');
const Schema = mongoose.Schema;
console.log('ello there');
const itemSchema = new Schema({
  name: String,
  seller: String,
  description: String,
  image: Buffer,
  price: String,
  quantity: Number,
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
// Compile model from schema
const Item = mongoose.model('item', itemSchema);
module.exports = Item;

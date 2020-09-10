const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log('ello there');
const itemSchema = new Schema({
  name: String,
  seller: String,
  description: String,
  image: Buffer,
  price: String,
  quantity: Number,
});
// Compile model from schema
const item = mongoose.model('item', itemSchema);
module.exports = item;

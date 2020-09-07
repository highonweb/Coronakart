const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  description: String,
  image: Buffer,
  price: String,
  quantity: Number,
});
// Compile model from schema
const item = mongoose.model('item', itemSchema);
module.exports = item;

const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  category: { type: String, required: true },
  items: [{
    id: Number,
    name: String,
    price: Number,
    description: String,
    image: String,
    available: { type: Boolean, default: true }
  }]
});

module.exports = mongoose.model('Menu', menuSchema);

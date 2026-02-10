const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  floors: [{
    id: Number,
    name: String,
    departments: [{
      id: Number,
      name: String,
      seats: [{
        id: String,
        number: String,
        occupied: Boolean
      }]
    }]
  }]
});

module.exports = mongoose.model('Building', buildingSchema);

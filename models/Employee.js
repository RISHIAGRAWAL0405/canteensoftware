const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d+$/.test(v);
      },
      message: 'Employee ID must contain only integers'
    }
  },
  employeeName: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v);
      },
      message: 'Employee name must contain only English letters'
    }
  },
  savedAddress: {
    building: String,
    floor: String,
    room: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);

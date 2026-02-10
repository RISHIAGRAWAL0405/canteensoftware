const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: Number,
  location: {
    employeeId: String,
    employeeName: String,
    building: String,
    floor: String,
    department: String,
    seat: String,
    seatId: String
  },
  items: [{
    id: Number,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  paymentMethod: String,
  status: { type: String, default: 'pending', enum: ['pending', 'preparing', 'ready', 'delivered', 'cancelled'] },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

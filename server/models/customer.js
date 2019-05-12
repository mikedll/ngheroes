
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer


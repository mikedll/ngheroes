
const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room


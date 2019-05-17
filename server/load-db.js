
require('./mongoose-connect')
const mongoose = require('mongoose')
const config = require('./config')

const Room = require('./models/room')

const rooms = [
  '103', '104', '105',
  '202', '203', '204',
  '301', '302', '303', '304'
]

var saves = []
rooms.forEach(roomNumber => {
  const newRoom = new Room({number: roomNumber});
  // console.log("may save a room: " + newRoom.number)
  saves.push(newRoom.save().then(room => console.log(`Saved ${room.number}`)))
})

Promise.all(saves).then((results) => {
  console.log("Disconnecting...")
  mongoose.disconnect()
})

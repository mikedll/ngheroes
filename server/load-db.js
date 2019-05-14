
const Room = require('./models/room')

const rooms = [
  '103', '104', '105',
  '202', '203', '204',
  '301', '302', '303', '304'
]

rooms.forEach(roomNumber => {
  const newRoom = new Room({number: roomNumber});
  newRoom.save().then(room => console.log(`Saved ${room.number}`))
})

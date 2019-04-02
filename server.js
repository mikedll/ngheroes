
const config = require('./server/config')
require('./server/mongoose')
const express = require('express')

const app = express()

const port = config.port

app.use(express.static('dist/stays5'))

// app.get('/', (req, res) => res.send("Hello World!"))

// app.listen(port, () => console.log(`Listening on port ${port}!`))

const mongoose = require('mongoose')

const HeroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const heroes = [
  { name: 'Mr. Nice' },
  { name: 'Narco' },
  { name: 'Bombasto' },
  { name: 'Celeritas' },
  { name: 'Magneta' },
  { name: 'RubberMan' },
  { name: 'Dynama' },
  { name: 'Dr IQ' },
  { name: 'Magma' },
  { name: 'Tornado' }      
];

const Hero = mongoose.model('Hero', HeroSchema);

const hero = new Hero(heroes[0]);
hero.save().then(hero => console.log(`Saved. ${hero.id}`));

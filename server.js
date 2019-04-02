
const path = require('path')
const config = require('./server/config')
require('./server/mongoose')
const express = require('express')

const Hero = require('./server/models/hero')

// TODO: Move out of here.
// require('./server/load-db')

const app = express()

const port = config.port

app.use(express.static(path.join(__dirname, 'dist/stays5')))

app.get('/', (req, res, next) => {
  res.send("Welcome. Hit /heroes/:id")
})

app.get('/heroes/:id', (req, res, next) => {
  const id = req.params.id

  const hero = Hero.findById(id)

  hero.then(hero => {
    res.send(`Found ${hero.name}`)
  }).catch(err => {
    next(`Hero having id=${id} not found.`)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))


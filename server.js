
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

app.use(express.json())

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/stays5/index.html'))
})

app.get('/dashboard', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/stays5/index.html'))
})

app.get('/heroes', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/stays5/index.html'))
})

app.get('/detail/:id', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist/stays5/index.html'))
})

app.put('/api/heroes', (req, res, next) => {
  const heroIn = req.body
  const id = heroIn._id

  const heroFind = Hero.findById(id)
  heroFind.then(hero => {
    hero.set(heroIn)
    return hero.save()
  }).then(hero => {
    res.send(`Updated ${hero.name}`)
  }).catch(err => {
    next(`Error saving hero having id=${id}.`)
  })
})

app.get('/api/heroes', (req, res, next) => {
  const heroesFind = Hero.find()

  heroesFind.then(heroes => {
    res.json(heroes)
  }).catch(err => next(err))
})

app.post('/api/heroes', (req, res, next) => {
  const hero = new Hero(req.body)

  console.log("hero json:", hero)

  hero.save()
    .then(hero => res.json(hero))
    .catch(err => next(err))
})

app.get('/api/heroes/:id', (req, res, next) => {
  const id = req.params.id

  const heroFind = Hero.findById(id)

  heroFind.then(hero => {
    res.json(hero)
  }).catch(err => {
    next(`Hero having id=${id} not found.`)
  })
})

app.delete('/api/heroes/:id', (req, res, next) => {
  const id = req.params.id

  Hero.remove({_id: id}).then((ok, n) => {
    res.sendStatus(200)
  }).catch(err => {
    next(`Hero having id=${id} not found.`)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))


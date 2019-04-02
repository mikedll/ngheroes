
const path = require('path')
const config = require('./config')
require('./mongoose')
const express = require('express')
const cons = require('consolidate')
const Hero = require('./models/hero')

// TODO: Move out of here.
// require('./server/load-db')

const app = express()

const port = config.port

app.engine('mustache', cons.mustache)
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, '../dist/stays5')))

app.use(express.json())

app.get(/^\/((?!api).)*$/, (req, res, next) => {
  res.render('index', { csrfToken: 'blah2' })
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
  const term = req.query.name
  const heroesFind = Hero.find(term ? { name: RegExp(term) } : {})

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

  let foundHero = null
  Hero.find({_id: id}).then(hero => {
    foundHero = hero
    return Hero.deleteOne({_id: id})
  }).then((ok, n) => {
    res.json(foundHero)
  }).catch(err => {
    next(`Delete hero with id=${id} failed.`)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))


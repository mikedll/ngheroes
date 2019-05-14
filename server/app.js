

const path = require('path')
const config = require('./config')

const express = require('express')
const cookieParser = require('cookie-parser')
const cons = require('consolidate')
const csrf = require('csurf')

const Hero = require('./models/hero')
const Room = require('./models/room')
const Customer = require('./models/customer')
const Reservation = require('./models/reservation')

/*
 * Configure app and some middleware.
 */

const app = express()
app.engine('mustache', cons.mustache)
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, './views'))

app.use(cookieParser())
app.use(csrf({ cookie: true }))

// filter with a better regex, to catch only index?
app.get(/^\/$/, (req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  next()
})

app.use(express.static(path.join(__dirname, '../dist/stays5')))

app.use(express.json())

/*
 * Default route.
 */

app.get(/^\/((?!api).)*$/, (req, res, next) => {
  res.cookie('XSRF-TOKEN', req.csrfToken())
  res.render('index')
})

/*
 * Begin API.
 */

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

app.get('/api/customers', (req, res, next) => {
  const term = req.query.name

  Customer.find(term ? {} : {}).then(customers => {
    res.json(customers)
  }).catch(err => next(err))
})

app.post('/api/customers', (req, res, next) => {
  const customer = new Customer(req.body)

  customer
    .save()
    .then(customer => res.json(customer))
    .catch(err => next(err))
})

app.get('/api/rooms', (req, res, next) => {
  const term = req.query.name

  Room.find(term ? { number: RegExp(term) } : {}).then(rooms => {
    res.json(rooms)
  }).catch(err => next(err))
})

app.post('/api/rooms', (req, res, next) => {
  const room = new Room(req.body)

  room
    .save()
    .then(room => res.json(room))
    .catch(err => next(err))
})

module.exports = app


const path = require('path')
const config = require('./config')
require('./mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const cons = require('consolidate')
const csrf = require('csurf')
const Hero = require('./models/hero')

// TODO: Move out of here.
// require('./server/load-db')

/*
 * Configure app and some middleware.
 */

const app = express()
app.engine('mustache', cons.mustache)
app.set('view engine', 'mustache')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, '../dist/stays5')))

app.use(express.json())

app.use(cookieParser())

const csrfProtection = csrf({ cookie: true })

/*
 * Default route.
 */

app.get(/^\/((?!api).)*$/, csrfProtection, (req, res, next) => {
  res.render('index', { csrfToken: req.csrfToken() })
})

/*
 * Begin API.
 */

app.put('/api/heroes', csrfProtection, (req, res, next) => {
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

app.post('/api/heroes', csrfProtection, (req, res, next) => {
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

app.delete('/api/heroes/:id', csrfProtection, (req, res, next) => {
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

/*
 * Launch server.
 */
app.listen(config.port, () => console.log(`Listening on port ${config.port}!`))


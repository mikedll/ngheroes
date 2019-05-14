const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.mongo.uri, config.mongo.connectionOpts)

mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${config.mongo.uri}`)
});

mongoose.connection.on('error', () => {
  throw new Error(`error occurred in database ${config.mongo.uri}`)
});


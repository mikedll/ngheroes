const config = require('./config')
const mongoose = require('mongoose')

const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { keepAlive: 1, useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database ${mongoUri}`)
});


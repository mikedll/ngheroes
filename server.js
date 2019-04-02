
const config = require('./server/config')
const express = require('express')
const app = express()

const port = config.port

app.use(express.static('dist/stays5'))

// app.get('/', (req, res) => res.send("Hello World!"))

// app.listen(port, () => console.log(`Listening on port ${port}!`))


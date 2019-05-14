
require('./mongoose-connect')
const config = require('./config')
const app = require('./app.js')

/*
 * Launch server.
 */
app.listen(config.port, () => console.log(`Listening on port ${config.port}!`))

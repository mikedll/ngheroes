
require('./mongoose-connect')
const config = require('./config')
const app = require('./app.js')


// TODO: Move out of here.
// require('./load-db.js')


/*
 * Launch server.
 */
app.listen(config.port, () => console.log(`Listening on port ${config.port}!`))

/* eslint consistent-return:0 */

const express = require('express')
const logger = require('./logger')

const argv = require('minimist')(process.argv.slice(2))
const setup = require('./middlewares/front-middleware')
const routes = require('./routes')

const bodyParser = require('body-parser')
const resolve = require('path').resolve

const app = express()

app.use(require('helmet')())
// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use(bodyParser.json())

routes(app)

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

const port = argv.port || process.env.PORT || 3000

// Start your app.
app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message)
  }

  logger.appStarted(port, prettyHost)
})

const fs = require('fs')
const http = require('http')
const http2 = require('http2')
const app = require('./src/app')

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const port = process.env.PORT
const httpPort = process.env.HTTP_PORT
const options = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_DIRECTORY),
  cert: fs.readFileSync(process.env.CERTIFICATE_DIRECTORY),
  allowHTTP1: true
}

const appOptions = {
  port,
  dbPath: process.env.DB_JSON,
  points: process.env.RATE_LIMITER_POINTS,
  duration: process.env.RATE_LIMITER_DURATION,
  redisUri: process.env.REDIS_URI,
}

async function main() {
  const handler = await app(appOptions)

  http.createServer(handler.callback())
    .listen(httpPort, () => console.log('running redirect all http connection'))

  http2.createSecureServer(options, handler.callback())
    .listen(port, () => console.log('listening on port', port))
}

main().catch(e => console.log(e))

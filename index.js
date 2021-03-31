const fs = require('fs')
const http2 = require('http2')
const app = require('./src/app')

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const port = process.env.PORT
const options = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_DIRECTORY),
  cert: fs.readFileSync(process.env.CERTIFICATE_DIRECTORY),
  allowHTTP1: true
}

http2.createSecureServer(options, app.callback())
  .listen(port, () => console.log('listening on port', port))

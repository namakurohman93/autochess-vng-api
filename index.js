const fs = require('fs')
const http2 = require('http2')
const app = require('./src/app')

const port = process.env.PORT || 443
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/autochess-vng-api.didadadida93.xyz/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/autochess-vng-api.didadadida93.xyz/fullchain.pem"),
  allowHTTP1: true
}

http2.createSecureServer(options, app.callback())
  .listen(port, function() {
    console.log('listening on port', port)
  })

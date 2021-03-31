const fs = require('fs')
const http2 = require('http2')
const app = require('./src/app')

const port = process.env.PORT || 443
const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem")
}

http2.createSecureServer(options, app.callback())
  .listen(port, function() {
    console.log('listening on port', port)
  })

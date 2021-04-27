import fs from 'fs'
import Koa from 'koa'
import http from 'http'
import http2 from 'http2'
import { config } from 'dotenv'
import app from './src/app'

interface Http2Option {
  key: Buffer
  cert: Buffer
  allowHTTP1: boolean
}

if (process.env.NODE_ENV == 'development') {
  config()
}

const port: string = process.env.PORT as string
const httpPort: string = process.env.HTTP_PORT as string
const options: Http2Option = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_DIRECTORY as string),
  cert: fs.readFileSync(process.env.CERTIFICATE_DIRECTORY as string),
  allowHTTP1: true
}

async function main() {
  const handler: Koa = await app()

  http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers.host + req.url })
    res.end()
  })
    .listen(httpPort, () => console.log('running redirect all http connection'))

  http2.createSecureServer(options, handler.callback())
    .listen(port, () => console.log('listening on port', port))
}

main().catch(e => console.log(e))

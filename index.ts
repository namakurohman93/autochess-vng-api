import fs from 'fs'
import Koa from 'koa'
import http from 'http'
import http2 from 'http2'
import { config } from 'dotenv'
import app from './src/app'

if (process.env.NODE_ENV == 'development') {
  config()
}

const port: string = process.env.PORT as string
const httpPort: string = process.env.HTTP_PORT as string

async function main() {
  const handler: Koa = await app()
  handler.listen(httpPort, () => console.log('listening on port', httpPort))
}

main().catch(e => console.log(e))

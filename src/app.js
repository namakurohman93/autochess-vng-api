const Koa = require('koa')
const cors = require('@koa/cors')
const lowdb = require('./db')
const router = require('./router')
const rateLimiter = require('./rate-limiter')
const assignDb = require('./middlewares/assign-db')
const requestLimiter = require('./middlewares/request-limiter')
const customLogger = require('./middlewares/custom-logger')

async function main() {
  const app = new Koa()
  const db = await lowdb()
  const limiter = rateLimiter()

  app.use(customLogger())
  app.use(cors())
  app.use(requestLimiter(limiter))
  app.use(assignDb(db))
  app.use(router.routes())

  return app
}

module.exports = main

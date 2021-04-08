const Koa = require('koa')
const cors = require('@koa/cors')
const lowdb = require('./db')
const router = require('./router')
const rateLimiter = require('./rate-limiter')
const assignDb = require('./middlewares/assign-db')
const requestLimiter = require('./middlewares/request-limiter')
const forceHttps = require('./middlewares/force-https')

async function main(dbPath, points, duration, port) {
  const app = new Koa()
  const db = await lowdb(dbPath)
  const limiter = rateLimiter(points, duration)

  app.use(cors())
  app.use(forceHttps(port))
  app.use(requestLimiter(limiter))
  app.use(assignDb(db))
  app.use(router.routes())

  return app
}

module.exports = main

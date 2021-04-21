const Koa = require('koa')
const cors = require('@koa/cors')
const initDb = require('./models')
const router = require('./router')
const rateLimiter = require('./rate-limiter')
const assignDb = require('./middlewares/assign-db')
const requestLimiter = require('./middlewares/request-limiter')
const customLogger = require('./middlewares/custom-logger')

async function main() {
  const app = new Koa()
  const db = await initDb()
  const limiter = rateLimiter()

  app.use(customLogger())
  app.use(cors())
  app.use(requestLimiter(limiter))
  app.use(assignDb(db))
  app.use(router.routes())
  app.use(async (ctx, next) => {
    ctx.status = 404
    ctx.body = { error: true, message: 'not found' }
  })

  return app
}

module.exports = main

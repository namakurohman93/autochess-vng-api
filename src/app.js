const Koa = require('koa')
const lowdb = require('./db')
const router = require('./router')
const rateLimiter = require('./rate-limiter')

async function main(dbPath, points, duration) {
  const app = new Koa()
  const db = await lowdb(dbPath)
  const limiter = rateLimiter(points, duration)

  app.use(async (ctx, next) => {
    try {
      await limiter.consume(ctx.ip)
      await next()
    } catch(e) {
      ctx.status = 429
      ctx.body = { error: true, message: 'too many requests' }
    }
  })
  app.use(async (ctx, next) => {
    ctx.db = db
    await next()
  })
  app.use(router.routes())

  return app
}

module.exports = main

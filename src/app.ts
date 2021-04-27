import Koa, { Context } from 'koa'
import { Sequelize } from 'sequelize'
import cors from '@koa/cors'
import initDb from './models'
import router from './router'
import rateLimiter, { RateLimiter } from './rate-limiter'
import assignDb from './middlewares/assign-db'
import requestLimiter from './middlewares/request-limiter'
import customLogger from './middlewares/custom-logger'

export default async function() {
  const app = new Koa()
  const db: Sequelize = await initDb()
  const limiter: RateLimiter = rateLimiter()

  if (process.env.NODE_ENV != 'test') {
    app.use(customLogger())
  }

  app.use(cors())
  app.use(requestLimiter(limiter))
  app.use(assignDb(db))
  app.use(router.routes())
  app.use(async (ctx: Context) => {
    ctx.status = 404
    ctx.body = { error: true, message: 'not found' }
  })

  return app
}

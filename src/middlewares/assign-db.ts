import { Context, Next } from 'koa'
import { Sequelize } from 'sequelize'

export default function(db: Sequelize) {
  return async function(ctx: Context, next: Next) {
    ctx.db = db
    await next()
  }
}

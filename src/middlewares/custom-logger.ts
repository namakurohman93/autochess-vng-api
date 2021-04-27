import util from 'util'
import { Context, Next } from 'koa'

export default function() {
  return async function(ctx: Context, next: Next) {
    await next()

    const format: string = '%s - - [%s] "%s %s HTTP/1.x" %d %s'
    console.log(
      util.format(
        format,
        ctx.ip,
        new Date().toLocaleString(),
        ctx.method,
        ctx.path,
        ctx.status,
        ctx.length ? ctx.length.toString() : '-'
      )
    )
  }
}

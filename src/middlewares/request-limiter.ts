import { Context, Next } from 'koa'
import { RateLimiterRes } from 'rate-limiter-flexible'
import { RateLimiter } from '../rate-limiter'

export default function(limiter: RateLimiter) {
  return async function(ctx: Context, next: Next) {
    let resetTime: Date

    try {
      let rateLimiterRes: RateLimiterRes = await limiter.consume(ctx.ip)
      resetTime = new Date(Date.now() + rateLimiterRes.msBeforeNext)

      ctx.set('RateLimit-Remaining', rateLimiterRes.remainingPoints.toString())
      ctx.set('RateLimit-Reset', resetTime.toUTCString())

      await next()
    } catch(e) {
      if (e instanceof Error) {
        ctx.status = 500
        ctx.body = { error: true, message: 'internal server error' }
        return
      }

      resetTime = new Date(Date.now() + e.msBeforeNext)

      ctx.set('RateLimit-Reset', resetTime.toUTCString())
      ctx.status = 429
      ctx.body = { error: true, message: 'too many requests' }
    }
  }
}

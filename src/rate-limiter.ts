import IORedis from 'ioredis'
import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible'

export type RateLimiter = RateLimiterRedis | RateLimiterMemory

export default function() {
  const points: number = Number(process.env.RATE_LIMITER_POINTS as string)
  const duration: number = Number(process.env.RATE_LIMITER_DURATION as string)

  if (process.env.NODE_ENV == 'test') {
    return new RateLimiterMemory({
      points,
      duration
    })
  }

  const redis = new IORedis(process.env.REDIS_URI)

  return new RateLimiterRedis({
    points,
    duration,
    storeClient: redis,
    inmemoryBlockOnConsumed: points
  })
}

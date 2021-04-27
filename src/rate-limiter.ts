import IORedis from 'ioredis'
import { RateLimiterRedis, RateLimiterMemory } from 'rate-limiter-flexible'

export type RateLimiter = RateLimiterRedis | RateLimiterMemory

export default function() {
  const limit_points: string = process.env.RATE_LIMITER_POINTS as string
  const limit_duration: string = process.env.RATE_LIMITER_DURATION as string

  const points: number = +limit_points
  const duration: number = +limit_duration

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

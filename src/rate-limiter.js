const { RateLimiterRedis, RateLimiterMemory } = require('rate-limiter-flexible')
const Redis = require('ioredis')

module.exports = () => {
  if (process.env.NODE_ENV == 'test') {
    return new RateLimiterMemory({
      points: process.env.RATE_LIMITER_POINTS,
      duration: process.env.RATE_LIMITER_DURATION,
    })
  }

  const redis = new Redis(process.env.REDIS_URI)

  return new RateLimiterRedis({
    points: process.env.RATE_LIMITER_POINTS,
    duration: process.env.RATE_LIMITER_DURATION,
    storeClient: redis,
    inmemoryBlockOnConsumed: process.env.RATE_LIMITER_POINTS
  })
}

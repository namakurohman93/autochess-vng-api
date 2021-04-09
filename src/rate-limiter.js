const { RateLimiterRedis } = require('rate-limiter-flexible')
const Redis = require('ioredis')

module.exports = () => {
  const redis = new Redis(process.env.REDIS_URI)

  return new RateLimiterRedis({
    points: process.env.RATE_LIMITER_POINTS,
    duration: process.env.RATE_LIMITER_DURATION,
    storeClient: redis,
    inmemoryBlockOnConsumed: process.env.RATE_LIMITER_POINTS
  })
}

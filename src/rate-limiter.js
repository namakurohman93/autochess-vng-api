const { RateLimiterRedis } = require('rate-limiter-flexible')
const Redis = require('ioredis')

module.exports = (points, duration, redisUri) => {
  const redis = new Redis(redisUri)

  return new RateLimiterRedis({
    points,
    duration,
    storeClient: redis,
    inmemoryBlockOnConsumed: points
  })
}

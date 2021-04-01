const { RateLimiterMemory } = require('rate-limiter-flexible')

module.exports = (points, duration) => new RateLimiterMemory({ points, duration })

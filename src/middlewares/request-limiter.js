module.exports = limiter => async (ctx, next) => {
  try {
    await limiter.consume(ctx.ip)
    await next()
  } catch(e) {
    ctx.status = 429
    ctx.body = { error: true, message: 'too many requests' }
  }
}

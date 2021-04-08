module.exports = db => async (ctx, next) => {
  ctx.db = db
  await next()
}

module.exports = () => async (ctx, next) => {
  if (ctx.secure) return await next()

  const url = ctx.request.URL
  url.protocol = 'https'
  url.port = process.env.PORT

  ctx.response.status = 301
  ctx.response.redirect(url.href)
}

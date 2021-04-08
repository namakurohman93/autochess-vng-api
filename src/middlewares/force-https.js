module.exports = port => async (ctx, next) => {
  if (ctx.secure) return await next()

  const url = ctx.request.URL
  url.protocol = 'https'
  url.port = port

  ctx.response.status = 301
  ctx.response.redirect(url.href)
}

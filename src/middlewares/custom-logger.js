const util = require('util')

module.exports = () => async (ctx, next) => {
  await next()

  const format = '%s - - [%s] "%s %s HTTP/1.x" %d %s\n'
  console.log(
    util.format(
      format,
      ctx.ip,
      new Date().toLocaleString(),
      ctx.method,
      ctx.path,
      ctx.status,
      ctx.length ? ctx.length.toString() : '-'
    )
  )
}

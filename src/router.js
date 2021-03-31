const Router = require('@koa/router')
const router = new Router()

router.get("/", (ctx, next) => {
  ctx.body = { message: "Running!" }
})
router.get("/ping", (ctx, next) => {
  ctx.body = { message: "Pong!" }
})

module.exports = router

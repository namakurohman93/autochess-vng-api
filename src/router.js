const Router = require('@koa/router')
const router = new Router()

router.redirect('/', 'https://github.com/didadadida93/autochess-vng-api')

router.get('/heroes', (ctx, next) => {
  ctx.body = ctx.db.get('heroes').value()
})

router.get('/classes', (ctx, next) => {
  ctx.body = ctx.db.get('classes').value()
})

router.get('/races', (ctx, next) => {
  ctx.body = ctx.db.get('races').value()
})

module.exports = router

const Router = require('@koa/router')
const router = new Router()

router.redirect('/', 'https://github.com/didadadida93/autochess-vng-api')

router.get('/heroes', async (ctx, next) => {
  ctx.body = await ctx.db.models.hero.findAll({
    attributes: {
      exclude: ['classId']
    },
    include: [
      {
        model: ctx.db.models.job,
        as: 'class',
        attributes: ['name', 'synergies', 'icon']
      },
      {
        model: ctx.db.models.race,
        attributes: ['name', 'synergies', 'icon'],
        through: { attributes: [] }
      }
    ]
  })
})

router.get('/classes', async (ctx, next) => {
  ctx.body = await ctx.db.models.job.findAll()
})

router.get('/races', async (ctx, next) => {
  ctx.body = await ctx.db.models.race.findAll()
})

module.exports = router

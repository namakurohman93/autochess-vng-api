import Router from '@koa/router'
import { DefaultState, Context } from 'koa'

const router = new Router<DefaultState, Context>()

router.redirect('/', 'https://github.com/didadadida93/autochess-vng-api')

router.get('/heroes', async (ctx: Context) => {
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

router.get('/classes', async (ctx: Context) => {
  ctx.body = await ctx.db.models.job.findAll()
})

router.get('/races', async (ctx: Context) => {
  ctx.body = await ctx.db.models.race.findAll()
})

export default router

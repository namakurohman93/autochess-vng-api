const Koa = require('koa')
const router = require('./router')

const app = new Koa()

app.use(router.routes())

module.exports = app

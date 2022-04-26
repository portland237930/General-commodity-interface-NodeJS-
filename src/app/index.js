const Koa = require('koa')
const KoaBody = require('koa-body')
const UserRouter = require("../router/user.route")
    // 创建app实例
const app = new Koa()
app.use(KoaBody())
app.use(UserRouter.routes())
module.exports = app
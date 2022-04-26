// 导入模块
const Koa = require('koa')
const KoaBody = require('koa-body')
    // 导入用户路由
const UserRouter = require("../router/user.route")
    // 导入错误处理函数
const errhandler = require("./errhandler")
    // 创建app实例
const app = new Koa()
app.use(KoaBody())
app.use(UserRouter.routes())
app.on("error", errhandler)
module.exports = app
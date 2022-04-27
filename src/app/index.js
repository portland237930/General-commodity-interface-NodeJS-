// 导入模块
const Koa = require('koa')
const KoaBody = require('koa-body')
    // 导入用户路由
    // const UserRouter = require("../router/user.route")
    // const GoodsRouter = require("../router/goods.route")
    // 导入错误处理函数
const errhandler = require("./errhandler")
    // 引入路由自动加载
const router = require("../router")
    // 创建app实例
const app = new Koa()
app.use(KoaBody())
    // 引用路由,允许所有请求方式发送返回的错误一致(not Implemented)
app.use(router.routes()).use(router.allowedMethods())
    // app.use(UserRouter.routes())
    // app.use(GoodsRouter.routes())
    // 绑定错误处理事件
app.on("error", errhandler)
module.exports = app
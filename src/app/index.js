/**
 * 应用
 */
// 导入模块
const path = require('path');
// 引入中间件
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
    // 导入用户路由
    // const UserRouter = require("../router/user.route")
    // const GoodsRouter = require("../router/goods.route")
    // 自己写的模块
    // 导入错误处理函数
const errhandler = require("./errhandler")
    // 引入路由自动加载
const router = require("../router")
    // 创建app实例
const app = new Koa()
app.use(KoaBody({
        // 开启上传功能
        multipart: true,
        formidable: {
            // 设置上传地址
            uploadDir: path.join(__dirname, "../upload"),
            // 写入的文件将包括原始文件的扩展名
            keepExtensions: true
        }
    }))
    // 引用路由,允许所有请求方式发送返回的错误一致(not Implemented)
app.use(router.routes()).use(router.allowedMethods())
    // 允许静态资源上传
app.use(KoaStatic(path.join(__dirname, "../upload")))
    // app.use(UserRouter.routes())
    // app.use(GoodsRouter.routes())
    // 绑定错误处理事件
app.on("error", errhandler)
module.exports = app
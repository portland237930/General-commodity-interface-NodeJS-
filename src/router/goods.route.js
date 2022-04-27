// 导入模块
const Router = require('koa-router')
    // 定义路由
const router = new Router({ prefix: '/goods' })
const { upload } = require("../controller/goods.controller")
router.post("/upload", upload)
module.exports = router
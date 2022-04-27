/**
 * 商品路由模块
 */
// 导入模块
const Router = require('koa-router')
    // 定义路由
const router = new Router({ prefix: '/goods' })
    // 引入Token校验中间件
const { auth, hasNoAdminExist } = require("../middleware/auth_middlerware")
const { upload } = require("../controller/goods.controller")
router.post("/upload", auth, hasNoAdminExist, upload)
module.exports = router
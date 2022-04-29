/**
 * 商品路由模块
 */
// 导入模块
const Router = require('koa-router')
    // 定义路由
const router = new Router({ prefix: '/goods' })
    // 引入Token校验中间件
const { auth, hasNoAdminExist } = require("../middleware/auth_middlerware")
    // 引入参数校验中间件
const { paramsValidator } = require("../middleware/goods_middlerware")
const { upload, PubGoods } = require("../controller/goods.controller")
    // 上传商品接口
router.post("/upload", auth, hasNoAdminExist, upload)
    // 发布商品接口
router.post("/pubgoods", auth, hasNoAdminExist, paramsValidator, PubGoods)
module.exports = router
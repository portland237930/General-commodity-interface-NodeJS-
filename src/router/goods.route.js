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
const { UploadPictures, PubGoods, UpdateGoods, DeleteGoods } = require("../controller/goods.controller")
    // 上传商品接口
router.post("/upload", auth, hasNoAdminExist, UploadPictures)
    // 发布商品接口
router.post("/pubgoods", auth, hasNoAdminExist, paramsValidator, PubGoods)
    // 更新商品接口
router.put("/updategoods/:id", auth, hasNoAdminExist, paramsValidator, UpdateGoods)
    // 硬删除商品接口
router.delete("/deletegoods/:id", auth, hasNoAdminExist, DeleteGoods)
module.exports = router
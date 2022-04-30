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
    // 引入控制器
const { UploadPictures, PubGoods, UpdateGoods, DeleteGoods, RestoreGoods, findAllGoods } = require("../controller/goods.controller")
    // 上传商品接口
router.post("/upload", auth, hasNoAdminExist, UploadPictures)
    // 发布商品接口
router.post("/pubgoods", auth, hasNoAdminExist, paramsValidator, PubGoods)
    // 更新商品接口
router.put("/updategoods/:id", auth, hasNoAdminExist, paramsValidator, UpdateGoods)
    // 下架商品接口
router.post("/deletegoods/:id", auth, hasNoAdminExist, DeleteGoods)
    // 上架商品接口
router.post("/restoregoods/:id", auth, hasNoAdminExist, RestoreGoods)
    // 获取商品列表接口
router.get("/goodslist", findAllGoods)
    // 导出router对象
module.exports = router
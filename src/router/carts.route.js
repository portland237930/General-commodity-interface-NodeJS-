/**
 * 购物车路由模块
 */
// 导入模块
const Router = require("koa-router");
// 引入中间件
const { auth } = require("../middleware/auth_middlerware")
const { goodsidvalidator } = require("../middleware/cartsvalidator")
    // 引入控制器
const { addcarts } = require("../controller/cartcontroller")
    // 创建路由并设置前缀
const router = new Router({ prefix: '/carts' })
    // 编写路由规则
router.post("/", auth, goodsidvalidator, addcarts)
    // 导出router对象
module.exports = router
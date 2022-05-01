// 导入路由
const Router = require('koa-router')
    // 创建实例化对象
const router = new Router({ prefix: "/order" })
    // 引入中间件和控制器
const { auth } = require("../middleware/auth_middlerware")
const { createOrder } = require("../controller/ordercontroller")
const { validator } = require("../middleware/address_middleware")
    // 编写路由规则
router.post("/", auth, validator({
        address_id: "int",
        goods_info: "string",
        total: "string"
    }), createOrder)
    // 导出路由
module.exports = router
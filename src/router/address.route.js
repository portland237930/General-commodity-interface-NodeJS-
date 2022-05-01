/**
 * 地址路由模块
 */
// 引入路由
const Router = require("koa-router")
    // 创建实例化对象
const router = new Router({ prefix: "/address" })
    // 引入中间件和控制器
const { auth } = require("../middleware/auth_middlerware")
const { validator } = require("../middleware/address_middleware")
const { AddressCommit } = require("../controller/addresscontroller")
    // 编写路由规则
router.post("/", auth, validator({
        // 指定校验格式
        consignee: "string",
        phone: {
            type: "string",
            format: /^1\d{10}$/
        },
        address: 'string',
    }), AddressCommit)
    // 导出路由
module.exports = router
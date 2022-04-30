/**
 * 购物车路由模块
 */
// 导入模块
const Router = require("koa-router");
// 引入中间件
const { auth } = require("../middleware/auth_middlerware")
const { validator } = require("../middleware/cartsvalidator")
    // 引入控制器
const { addcarts, findAllCart, updateCarts } = require("../controller/cartcontroller")
    // 创建路由并设置前缀
const router = new Router({ prefix: '/carts' })
    // 编写路由规则
    // 添加购物车接口
router.post("/addcart", auth, validator({
        // 指定参数校验
        goods_id: { type: 'number', required: true }
    }), addcarts)
    // 获取购物车信息
router.get("/cartlist", auth, findAllCart)
    // 更新购物车信息
router.patch("/updatecarts/:id", auth, validator({
        // 指定参数校验
        num: { type: "number", required: false },
        selected: { type: "bool", required: false }
    }), updateCarts)
    // 导出router对象
module.exports = router
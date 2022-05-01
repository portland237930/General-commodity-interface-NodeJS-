// 引入Service
// 引入外部模块
const { nanoid } = require('nanoid')
const { create } = require("../service/order_service")
    // 创建控制器
class OrderController {
    async createOrder(ctx) {
        // 解构参数
        const user_id = ctx.state.user.id;
        const { address_id, goods_info, total } = ctx.request.body;
        const order_number = nanoid()
        const res = await create({ user_id, address_id, goods_info, total, order_number })
        ctx.body = {
            code: "0",
            message: "创建订单成功",
            result: res
        }
    }
}
// 导出控制器
module.exports = new OrderController()
// 引入Service
// 引入外部模块
const { nanoid } = require('nanoid')
const { create, findAll } = require("../service/order_service")
    // 创建控制器
class OrderController {
    // 创建订单控制器
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
        // 获得订单列表控制器
    async findAllOrder(ctx) {
        const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query
        console.log(pageNum, pageSize, status);

        const res = await findAll({ pageNum, pageSize, status })
        ctx.body = {
            code: "0",
            message: "获取订单列表成功",
            result: res
        }
    }
}
// 导出控制器
module.exports = new OrderController()
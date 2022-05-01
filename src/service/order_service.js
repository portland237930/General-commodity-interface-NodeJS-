// 引入模型
const Order = require("../model/order.model")
    // 创建service
class OrderService {
    async create(orderinfo) {
        return await Order.create(orderinfo)
    }
}
// 导出service
module.exports = new OrderService()
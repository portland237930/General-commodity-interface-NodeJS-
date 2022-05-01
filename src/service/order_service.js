// 引入模型
const Order = require("../model/order.model")
    // 创建service
class OrderService {
    async create(orderinfo) {
        return await Order.create(orderinfo)
    }
    async findAll(params) {
        const { pageNum, pageSize, status } = params
        return await Order.findAndCountAll({
            where: { status },
            attributes: ['address_id', 'goods_info', 'total', 'order_number', 'status'],
            offset: (pageNum - 1) * pageSize,
            limit: pageSize * 1
        })
    }
}
// 导出service
module.exports = new OrderService()
/**
 * 购物车业务模块
 */
// 导入service层
const { CreateOrUpdate, findAll } = require("../service/carts.service")
class CartsController {
    // 添加购物车回调
    async addcarts(ctx) {
        const user_id = ctx.state.user.id;
        const { goods_id } = ctx.request.body
            // console.log(user_id, goods_id);
        const res = await CreateOrUpdate(user_id, goods_id)
        ctx.body = {
            code: "0",
            message: "添加购物车成功",
            result: res
        }
    }
    async findAllCart(ctx) {
        const { pageNum, pageSize } = ctx.request.query
        const res = await findAll(pageNum, pageSize)
        ctx.body = {
            code: "0",
            message: "获取购物车信息成功",
            result: res
        }
    }
}
// 导出购物车控制器
module.exports = new CartsController()
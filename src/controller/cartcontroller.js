/**
 * 购物车业务模块
 */
// 导入service层
const { CreateOrUpdate, findAll, update, deleteCart, selectAll, unselectAll } = require("../service/carts.service")
const { cartFormatError, invalidGoodsId } = require("../constant/err_type")
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
        // 获得购物车列表回调
    async findAllCart(ctx) {
            const { pageNum, pageSize } = ctx.request.query
            const res = await findAll(pageNum, pageSize)
            ctx.body = {
                code: "0",
                message: "获取购物车信息成功",
                result: res
            }
        }
        // 更新购物车信息回调
    async updateCarts(ctx) {
            // 解构参数
            const { id } = ctx.request.params;
            const { num, selected } = ctx.request.body
                // 判断num和selected是否都未传
            console.log(num, selected);
            if (num === undefined && selected === undefined) {
                // 发起错误
                cartFormatError.message = "num和selected均未传"
                return ctx.app.emit('error', cartFormatError, ctx)
            }
            const res = await update({ id, num, selected })
                // 返回信息
            ctx.body = {
                code: "0",
                message: "更新购物车成功",
                result: res
            }
        }
        // 删除购物车回调
    async deleteCart(ctx) {
        // 解析参数
        const { ids } = ctx.request.body
            // console.log(ids);
        const res = await deleteCart(ids)
        ctx.body = {
            code: "0",
            message: "删除购物车成功",
            result: ""
        }
    }
    async SelectAllCarts(ctx) {
        // 获得用户id
        const user_id = ctx.state.user.id
        console.log(user_id);
        const res = await selectAll(user_id)
        ctx.body = {
            code: "0",
            message: "全选商品成功",
            result: res
        }
    }
    async UnSelectAllCarts(ctx) {
        // 获得用户id
        const user_id = ctx.state.user.id
        console.log(user_id);
        const res = await unselectAll(user_id)
        ctx.body = {
            code: "0",
            message: "全选商品成功",
            result: res
        }
    }
}
// 导出购物车控制器
module.exports = new CartsController()
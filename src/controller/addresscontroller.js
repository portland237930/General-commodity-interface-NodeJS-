/**
 * 地址业务模块
 */
// 引入service
const { createAddress, findAllAddress, update, deleteAddr, ChangeDefault } = require("../service/address.service")
    // 创建控制器
class AddressController {
    // 添加地址控制器
    async AddressCommit(ctx) {
        // 解析出user_id,consignee,phone,address
        const user_id = ctx.state.user.id;
        const { consignee, phone, address } = ctx.request.body;
        console.log(user_id, consignee, phone, address);
        // 向Service层发起请求
        const { dataValues } = await createAddress({ user_id, consignee, phone, address });
        const { createdAt, updatedAt, ...res } = dataValues
        // console.log(res);
        // 返回成功信息
        ctx.body = {
            code: "0",
            message: "添加地址成功",
            result: res
        }
    }
    async GetAddressList(ctx) {
        const user_id = ctx.state.user.id
        const res = await findAllAddress(user_id)
        ctx.body = {
            code: "0",
            message: "获得地址信息成功",
            result: res
        }
    }
    async updateAddress(ctx) {
            const id = ctx.request.params.id
            console.log(id);
            const res = await update(id, ctx.request.body)
            ctx.body = {
                code: "0",
                message: "修改地址成功",
                result: res
            }
        }
        // 删除接口地址
    async DeleteAddress(ctx) {
            const id = ctx.request.params.id
                // console.log(id);
            const res = await deleteAddr(id)
            ctx.body = {
                code: "0",
                message: "删除地址接口成功",
                result: res
            }
        }
        // 改变默认地址回调
    async ChangeDefaultAddres(ctx) {
        // 解析参数
        const id = ctx.request.params.id
        const user_id = ctx.state.user.id
        const res = await ChangeDefault(id, user_id)
        ctx.body = {
            code: "0",
            message: "改变默认地址成功",
            result: res
        }
    }
}
module.exports = new AddressController()
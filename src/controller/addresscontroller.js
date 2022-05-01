/**
 * 地址业务模块
 */
// 引入service
const { createAddress } = require("../service/address.service")
    // 创建控制器
class AddressController {
    // 添加地址控制器
    async AddressCommit(ctx) {
        // 解析出user_id,consignee,phone,address
        const user_id = ctx.state.user.id;
        const { consignee, phone, address } = ctx.request.body;
        console.log(user_id, consignee, phone, address);
        // 向Service层发起请求
        const res = await createAddress({ user_id, consignee, phone, address });
        // console.log(res);
        // 返回成功信息
        ctx.body = {
            code: "0",
            message: "添加地址成功",
            result: res
        }
    }
}
module.exports = new AddressController()
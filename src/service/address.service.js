/*
 * 地址服务模块
 */
// 引入模型
const Address = require("../model/address.model")
    //创建Service
class AddressService {
    async createAddress(addr) {
        // 解构参数
        // const { user_id, consignee, phone, address } = params
        console.log(addr);
        // 添加数据至数据模型
        return await Address.create(addr)
    }
}
// 导出Service
module.exports = new AddressService()
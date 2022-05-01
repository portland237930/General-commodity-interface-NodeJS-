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
            // console.log(addr);
            // 添加数据至数据模型
            return await Address.create(addr)
        }
        // 查找用户所有地址
    async findAllAddress(user_id) {
            // console.log(user_id);
            return await Address.findAll({
                attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
                where: { user_id }
            })
        }
        // 修改地址信息
    async update(id, addr) {
        return await Address.update(addr, { where: { id } })
    }
}
// 导出Service
module.exports = new AddressService()
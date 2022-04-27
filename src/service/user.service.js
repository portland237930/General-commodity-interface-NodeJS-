/**
 * 数据库操作service层
 */
// 获得User模型
const User = require("../model/user.model")
class UserService {
    // 数据库写入功能
    async createUser(user_name, password) {
            // 写入数据库
            const res = await User.create({ user_name, password })
            return res
        }
        // 数据库查询功能
    async getUserInfo({ id, user_name, password, is_admin }) {
            const whereOpt = {}
                // 如果字段存在就合并到whereOpt中
            id && Object.assign(whereOpt, { id })
            user_name && Object.assign(whereOpt, { user_name })
            password && Object.assign(whereOpt, { password })
            is_admin && Object.assign(whereOpt, { is_admin })
            const res = await User.findOne({
                    attributes: ["id", "user_name", "password", "is_admin"],
                    where: whereOpt
                })
                // 如果存在条件就返回用户信息否则返回null
                // console.log(res.dataValues);
            return res ? res.dataValues : null
        }
        // 修改用户字段功能
    async updateById({ id, user_name, password, is_admin }) {
        // 查找字段
        const whereOpt = { id }
            // 更新字段
        const newUser = {}
            // 根据需要更新的字段合并
        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })
            // 根据需要的字段更新数据库
        const res = await User.update(newUser, { where: whereOpt })
        console.log(res);
        // 返回是否成功的结果
        return res[0] > 0 ? true : false
    }
}
module.exports = new UserService()
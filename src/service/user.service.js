// 数据库操作
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
}
module.exports = new UserService()
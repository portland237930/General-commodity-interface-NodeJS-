// 导入数据库
const { createUser, getUserInfo } = require('../service/user.service')
const { userRegisterError } = require("../constant/err_type")
    // 处理用户业务
class UserController {
    async register(ctx, next) {
        // 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body
        try {
            // 操作数据库
            const res = await createUser(user_name, password)
                // console.log(aaa);
                // 注册成功结果
            ctx.body = {
                code: "0",
                message: "用户注册成功",
                result: {
                    id: res.id,
                    user_name: res.user_name
                }
            }
        } catch (error) {
            // 注册信息获取失败
            console.log("用户注册错误", error);
            ctx.app.emit("error", userRegisterError, ctx)
        }
    }
    async login(ctx, next) {
        ctx.body = "用户登录成功"
    }
}
module.exports = new UserController
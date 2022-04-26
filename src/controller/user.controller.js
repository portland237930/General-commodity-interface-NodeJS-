// 导入数据库
const { createUser, getUserInfo } = require('../service/user.service')
    // 处理用户业务
class UserController {
    async register(ctx, next) {
        // 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body
            // 如果用户已经存在
        if (await getUserInfo({ user_name })) {
            console.error("用户已经存在", ctx.request.body);
            ctx.status = 409
            ctx.body = {
                code: "10002",
                message: "用户已经存在",
                result: ""
            }
            return
        }
        // 操作数据库
        const res = await createUser(user_name, password)
        console.log(res);
        // 获得结果
        ctx.body = {
            code: "0",
            message: "用户注册成功",
            result: {
                user_name,
                password
            }
        }
    }
    async login(ctx, next) {
        ctx.body = "用户登录成功"
    }
}
module.exports = new UserController
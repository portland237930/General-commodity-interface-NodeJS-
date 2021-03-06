/**
 * 用户接口业务模块
 */
// 导入数据库服务层功能
const { createUser, getUserInfo, updateById } = require('../service/user.service')
    // 引入Jsonwebtoken
const jwt = require("jsonwebtoken")
    // 引入环境变量
const { JWT_SECRET } = require("../config/config.default")
const { userRegisterError } = require("../constant/err_type")
    // 处理用户业务
class UserController {
    // 用户注册请求
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
        // 用户登录请求
    async login(ctx, next) {
            const { user_name } = ctx.request.body
            try {
                // 通过用户名查询数据库字段,排除password
                const { password, ...res } = await getUserInfo({ user_name })
                    // 返回登录成功结果
                ctx.body = {
                    code: "0",
                    mesage: "用户登录成功",
                    // 返回token令牌
                    result: {
                        token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
                    }
                }
            } catch (error) {
                console.error("登录失败", error);
            }
        }
        // 修改密码回调
    async changePassword(ctx, next) {
        // 获得修改密码的用户id和修改后的密码
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        console.log(id, password)
            // 操作数据库
        if (await updateById({ id, password })) {
            // 如果修改成功返回成功结果
            ctx.body = {
                code: "0",
                message: "修改密码成功",
                result: ""
            }
        } else {
            ctx.body = {
                code: "10007",
                message: "修改密码失败",
                result: ""
            }
        }
    }
}
// 导出用户控制器
module.exports = new UserController()
// 引入用户校验常量
const { userFormartErr, userAlreadyExisits, userRegisterError } = require("../constant/err_type")
const { getUserInfo } = require("../service/user.service")
    // 引入密码加密
const bcrypt = require('bcryptjs');
// 用户名校验中间件
const uservalidator = async(ctx, next) => {
    const { user_name, password } = ctx.request.body
        // 如果用户名或密码不存在
    if (!user_name || !password) {
        console.error("用户名或密码不能为空", ctx.request.body);
        // 触发错误处理
        // console.log(userFormartErr);
        ctx.app.emit("error", userFormartErr, ctx)
        return
    }
    // 校验成功
    await next()
}
const userexisitvalidator = async(ctx, next) => {
    const { user_name } = ctx.request.body
        // if (await getUserInfo({ user_name })) {
        //     console.error("用户已经存在", ctx.request.body);
        //     // 触发错误处理
        //     console.log(userAlreadyExisits);
        //     ctx.status = 409
        //     ctx.app.emit("error", userAlreadyExisits, ctx)
        //     return
        // }
        // 错误处理
    try {
        // 判断是否获得到用户信息
        const res = await getUserInfo({ user_name })
            // 如果用户已存在
        if (res) {
            console.error("用户已存在", { user_name });
            ctx.app.emit("error", userAlreadyExisits, ctx)
            return
        }
    } catch (error) {
        // 如果未获得到用户信息
        console.error("获取用户错误信息", error);
        ctx.app.emit("error", userRegisterError, ctx)
        return
    }
    // 校验成功
    await next()
}
const cryptPassword = async(ctx, next) => {
    const { password } = ctx.request.body
        // 密码加密
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // 获得加密结果
    ctx.request.body.password = hash;
    // 执行下个流程
    await next()
}
module.exports = {
    uservalidator,
    userexisitvalidator,
    cryptPassword
}
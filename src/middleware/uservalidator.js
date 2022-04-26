// 引入用户校验常量
const { userFormartErr, userAlreadyExisits } = require("../consitant/err_type")
const { getUserInfo } = require("../service/user.service")
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
    if (await getUserInfo({ user_name })) {
        console.error("用户已经存在", ctx.request.body);
        // 触发错误处理
        console.log(userAlreadyExisits);
        ctx.status = 409
        ctx.app.emit("error", userAlreadyExisits, ctx)
        return
    }
    // 校验成功
    await next()
}
module.exports = {
    uservalidator,
    userexisitvalidator
}
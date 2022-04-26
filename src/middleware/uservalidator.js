// 用户名校验中间件
const uservalidator = async(ctx, next) => {
    const { user_name, password } = ctx.request.body
        // 如果用户名或密码不存在
    if (!user_name || !password) {
        console.error("用户名或密码不能为空", ctx.request.body);
        ctx.status = 400
        ctx.body = {
            code: "10001",
            message: "用户名或密码不能为空",
            result: ""
        }
        return
    }
    // 校验成功就
    await next()
}
module.exports = {
    uservalidator
}
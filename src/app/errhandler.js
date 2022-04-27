module.exports = (err, ctx) => {
    // 用户注册错误处理函数
    // 初始化状态码
    let status = 500
    switch (err.code) {
        case "10001":
            status = 400
            break
        case "10002":
            status = 409
            break
        default:
            status = 500
            break
    }
    ctx.status = status
    ctx.body = err
        // console.log(ctx.status);
        // console.log(err);
}
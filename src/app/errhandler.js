module.exports = (err, ctx) => {
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
}
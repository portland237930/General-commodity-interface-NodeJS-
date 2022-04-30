// 引入错误信息
const { cartFormatError } = require("../constant/err_type")
    // 商品id参数校验
const validator = (rule) => {
        // 使用闭包自定义校验参数和格式
        return async(ctx, next) => {
            try {
                // 指定参数校验
                ctx.verifyParams(rule)
            } catch (error) {
                console.error("参数校验失败", error);
                cartFormatError.result = error;
                return ctx.app.emit('error', cartFormatError, ctx)
            }
            await next()
        }
    }
    // 导出中间件
module.exports = {
    validator
}
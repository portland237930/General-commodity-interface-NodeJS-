/**
 * 地址校验中间件
 */
const { addressFormatError } = require('../constant/err_type')
const validator = (rule) => {
    // 地址参数校验
    return async(ctx, next) => {
        try {
            ctx.verifyParams(rule)
        } catch (error) {
            console.error(error);
            ctx.app.emit("error", addressFormatError, ctx)
        }
        await next()
    }
}
module.exports = {
    validator
}
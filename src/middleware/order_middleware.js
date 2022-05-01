const { OrderFormatError } = require('../constant/err_type')
const validator = rule => {
    // 订单参数校验
    return async(ctx, next) => {
        try {
            ctx.verifyParams(rule)
        } catch (error) {
            console.error(error);
            return ctx.app.emit("error", OrderFormatError, ctx)
        }
        await next();
    }
}
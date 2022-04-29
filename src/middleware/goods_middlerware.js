const { ParamsFormatError } = require('../constant/err_type')
const paramsValidator = async(ctx, next) => {
    try {
        // 商品参数校验
        ctx.verifyParams({
            // 指定校验格式
            goods_name: { type: "string", required: true },
            goods_num: { type: "number", required: true },
            goods_price: { type: "number", required: true },
            goods_img: { type: "string", required: true },
        });
    } catch (error) {
        // 校验失败发起错误
        console.error("商品参数格式错误", error);
        // 合并错误信息
        ParamsFormatError.result.error = error
        return ctx.app.emit("error", ParamsFormatError, ctx)
    }
    await next();
}
module.exports = {
    paramsValidator
}
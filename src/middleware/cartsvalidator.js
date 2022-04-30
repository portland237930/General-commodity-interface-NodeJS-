// 引入错误信息
const { invalidGoodsId } = require("../constant/err_type")
    // 商品id参数校验
const goodsidvalidator = async(ctx, next) => {
        try {
            // 指定参数校验
            ctx.verifyParams({
                goods_id: 'number'
            })
        } catch (error) {
            console.error("参数校验失败", error);
            return ctx.app.emit('error', invalidGoodsId, ctx)
        }
        await next()
    }
    // 导出中间件
module.exports = {
    goodsidvalidator
}
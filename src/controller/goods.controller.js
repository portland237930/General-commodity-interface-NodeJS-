/**
 * 商品接口业务模块
 */
class GoodsController {
    // 上传图片请求
    async upload(ctx, next) {
        ctx.body = "上传图片成功"
    }
}
module.exports = new GoodsController()
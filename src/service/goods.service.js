/**
 * 商品数据库操作service层
 */
// 导入数据库模型
const Goods = require("../model/goods.model")
const { publishGoodsError } = require("../constant/err_type")
class GoodsService {
    // 创建商品信息,（传入goods商品信息）
    async createGoods(goods) {
        try {
            const res = await Goods.create(goods);
            return res.dataValues
        } catch (error) {
            console.error("商品发布失败", error);
            return ctx.app.emit("error", publishGoodsError, ctx)
        }
    }
}
module.exports = new GoodsService()
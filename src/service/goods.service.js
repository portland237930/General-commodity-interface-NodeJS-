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
        // 更新商品信息(传入商品id和商品信息goods)
    async updategoods(id, goods) {
        // 根据ID更改数据库商品信息(where中必须是一个对象)
        const res = await Goods.update(goods, {
                where: { id }
            })
            // 返回成功或失败结果
        return res[0] > 0 ? true : false
    }
    async deletegoods(id) {
        const res = await Goods.destroy({ where: { id } })
            // console.log(res);
        return res > 0
    }
}
module.exports = new GoodsService()
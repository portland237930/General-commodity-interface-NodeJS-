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
    async restoregoods(id) {
        const res = await Goods.restore({ where: { id } })
        return res > 0
    }
    async findAll(pageNum, pageSize) {
        // // 商品总数(自动索引deleteAt为空的值)
        // const count = await Goods.count()
        //     // 获得偏移量
        // const offset = (pageNum - 1) * pageSize
        //     // 根据offset和limit查询数据库
        // const row = await Goods.findAll({ offset: offset, limit: pageSize * 1 })
        // 使用findAndCountAll方法获得商品总数和商品列表信息
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Goods.findAndCountAll({ offset: offset, limit: pageSize * 1 })
            // 返回商品信息
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
}
module.exports = new GoodsService()
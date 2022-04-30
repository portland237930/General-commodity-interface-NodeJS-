/**
 * 购物车数据库操作Service层
 */
// 引入用户模型
const Cart = require('../model/carts.model')
const { Op } = require("sequelize")
class CartService {
    async CreateOrUpdate(user_id, goods_id) {
        // console.log(goods_id);
        let res = await Cart.findOne({
                // 同时查询两个条件
                where: {
                    [Op.and]: {
                        user_id,
                        goods_id,
                    },
                }
            })
            // console.log(res);
            // 如果字段存在
        if (res) {
            // 将得到的num字段自动增长1
            await res.increment('num')
                // 重新加载数据库
            return res.reload()
        }
        // 如果不存在字段就创建字段
        else {
            return await Cart.create({
                goods_id,
                user_id,
            })
        }
    }
}
module.exports = new CartService()
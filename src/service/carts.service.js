/**
 * 购物车数据库操作Service层
 */
// 引入用户模型
const Cart = require('../model/carts.model')
const { Op } = require("sequelize")
const Goods = require("../model/goods.model")
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
    async findAll(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'num', 'selected'],
            offset: offset,
            limit: pageSize * 1,
            include: {
                model: Goods,
                as: "goods_info",
                attributes: ['goods_name', 'goods_price', 'goods_img']
            }
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }

    }


}
module.exports = new CartService()
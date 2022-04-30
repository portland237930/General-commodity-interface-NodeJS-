/**
 * 购物车数据库操作Service层
 */
// 引入用户模型
const Cart = require('../model/carts.model')
const { Op } = require("sequelize")
const Goods = require("../model/goods.model")
class CartService {
    // 添加购物车
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
        // 查找购物车列表
    async findAll(pageNum, pageSize) {
            const offset = (pageNum - 1) * pageSize
            const { count, rows } = await Cart.findAndCountAll({
                    attributes: ['id', 'num', 'selected'],
                    offset: offset,
                    limit: pageSize * 1,
                    // 引入外键索引的数据表字段
                    include: {
                        model: Goods,
                        // 设置字段别名
                        as: "goods_info",
                        attributes: ['goods_name', 'goods_price', 'goods_img']
                    }
                })
                // 指定返回格式
            return {
                pageNum,
                pageSize,
                total: count,
                list: rows
            }

        }
        // 更新购物车信息
    async update(params) {
            // 解构参数
            const { id, num, selected } = params
            // 通过商品id查找商品信息
            const res = await Cart.findByPk(id)
                // 如果没有值就什么都不做
            if (!res) return ''
                // 更新数据
            num !== undefined ? res.num = num : ''
            selected !== undefined ? res.selected = selected : ''
                // 将数据存于数据库
            return res.save()
        }
        // 删除购物车信息
    async deleteCart(ids) {
        try {
            // 删除指定字段
            return await Cart.destroy({
                where: {
                    // 等价数据库查询IN[ids]
                    id: {
                        [Op.in]: ids
                    }
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    async selectAll(user_id) {
        // 将该用户的所有selected字段设置为true
        return await Cart.update({
            selected: true,
        }, { where: { user_id } })
    }
    async unselectAll(user_id) {
        // 将该用户的所有selected字段设置为true
        return await Cart.update({
            selected: false
        }, { where: { user_id } })
    }
}
module.exports = new CartService()
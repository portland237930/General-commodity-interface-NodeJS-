/**
 * 商品数据库模型
 */
const { DataTypes } = require("sequelize")
const seq = require("../db/seq")
    // 创建数据库模型
const Goods = seq.define('zd_good', {
        // 指定数据库字段和类型
        goods_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "商品名称"
        },
        goods_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "商品数量"
        },
        goods_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: "商品价格"
        },
        goods_img: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "商品图片URL"
        }
    }, {
        timestamps: false
    })
    // 同步数据库
    // Goods.sync({ force: true })
Goods.sync()
module.exports = Goods
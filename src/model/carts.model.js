// 导入sequelize
const { DataTypes } = require("sequelize")
const seq = require("../db/seq")
    // 创建数据模型
const Carts = seq.define('zd_cart', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id"
        },
        goods_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "商品id"
        },
        num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "商品数目"
        },
        selected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: "是否选中"
        }
    })
    // 同步数据库
    // Carts.sync({ force: true })
Carts.sync()
    // 导出数据模型
module.exports = Carts
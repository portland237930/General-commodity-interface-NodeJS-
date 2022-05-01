// 引入seq
const { DataTypes } = require("sequelize")
const seq = require("../db/seq")
    // 创建数据模型
const Order = seq.define('zd_order', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户ID"
        },
        address_id: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "地址Id"
        },
        goods_info: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "商品信息"
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: "商品总价"
        },
        order_number: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "订单号"
        },
        status: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
            comment: "订单状态,0为未发货,1为已发货,2为未付款,3为已付款"
        }
    })
    // 同步数据库
    // Order.sync({ force: true })
    // 导出数据模型
module.exports = Order
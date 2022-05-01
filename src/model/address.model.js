/**
 * 地址数据模型
 */
// 导入sequelize
const { DataTypes } = require("sequelize")
const seq = require("../db/seq")
    // 创建数据模型
const Address = seq.define('zd_address', {
        // 指定数据类型
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "用户id"
        },
        consignee: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "收货人姓名"
        },
        phone: {
            type: DataTypes.CHAR(11),
            allowNull: false,
            comment: "收货人手机号码"
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "收货人地址"
        },
        is_default: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 1,
            comment: "是否为默认地址,默认为1"
        }
    })
    // 同步数据库
Address.sync({ force: true })
    // 导出模型
module.exports = Address
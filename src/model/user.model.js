/**
 * 用户数据库模型
 */
// 导入模块
const { DataTypes } = require("sequelize")
    // 获得数据库
const seq = require("../db/seq")
    // 创建模型  模型名为zd_user 数据库名为zd_users
const User = seq.define("zd_user", {
        // id字段自动创建
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "用户名"
        },
        password: {
            type: DataTypes.CHAR(64),
            allowNull: false,
            comment: "密码"
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
            comment: "0为管理员,1为普通用户,默认为0"
        }
    }, {
        timestamps: false
    })
    // 模型同步（如果表存在则覆盖）
    // User.sync({ force: true })
User.sync()
module.exports = User
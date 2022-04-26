// 导入sequelize
const { Sequelize } = require('sequelize');
// 导入配置文件
const {
    MYSQL_HOST,
    MYSQL_USER_NAME,
    MYSQL_PASSWORD,
    MYSQL_DB,
    MYSQL_DBNAME
} =
require("../config/config.default")
    // 建立数据库连接
const seq = new Sequelize(MYSQL_DBNAME, MYSQL_USER_NAME, MYSQL_PASSWORD, {
        host: MYSQL_HOST,
        dialect: MYSQL_DB
    })
    // 数据库测试链接
    // seq.authenticate().then(() => {
    //         console.log("数据库连接成功");
    //     }).catch((err) => {
    //         console.log("数据库连接失败", err);
    //     })
    // console.log(seq);
module.exports = seq
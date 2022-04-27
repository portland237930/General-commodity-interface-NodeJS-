/**
 * 该文件用于路由自动加载
 */
// 导入模块
const fs = require("fs");
// 导入路由
const Router = require("koa-router")
const router = new Router();
// 同步获得所有文件名
fs.readdirSync(__dirname).forEach(file => {
    // 排除index.js文件
    if (file !== 'index.js') {
        // 引入所有路由
        let f = require("./" + file)
        router.use(f.routes())
    }
})
module.exports = router
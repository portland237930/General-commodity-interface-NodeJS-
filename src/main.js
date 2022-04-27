/**
 * 项目入口文件
 */
// 导入环境变量
const {
    APP_PORT
} = require('./config/config.default')
    // 创建服务器
const app = require('./app')
app.listen(APP_PORT, () => {
    console.log(`server is running in http://localhost:${APP_PORT}`);
})
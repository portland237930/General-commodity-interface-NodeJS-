// 用户路由
const Router = require('koa-router')
const { register, login } = require("../controller/user.controller")
    // 引入中间件
const { uservalidator } = require("../middleware/uservalidator")
    // 创建路由对象
const router = new Router({ prefix: '/user' })
    // 用户注册接口
router.post("/register", uservalidator, register)
    // 用户登录接口
router.post("/login", login)
module.exports = router
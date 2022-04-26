// 用户路由
const Router = require('koa-router')
const { register, login } = require("../controller/user.controller")
    // 引入用户注册校验中间件
const { uservalidator, userexisitvalidator, cryptPassword } = require("../middleware/uservalidator")
    // 创建路由对象
const router = new Router({ prefix: '/user' })
    // 用户注册接口
router.post("/register", userexisitvalidator, uservalidator, cryptPassword, register)
    // 用户登录接口
router.post("/login", login)
module.exports = router
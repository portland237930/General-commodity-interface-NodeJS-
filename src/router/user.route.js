/**
 * 用户路由模块
 */
// 用户路由
const Router = require('koa-router')
const { register, login, changePassword } = require("../controller/user.controller")
    // 引入用户注册校验中间件
const { uservalidator, userexisitvalidator, cryptPassword, verifyLogin } = require("../middleware/uservalidator")
    // 引入token校验中间件
const { auth } = require("../middleware/auth_middlerware")
    // 创建路由对象
const router = new Router({ prefix: '/user' })
    // 用户注册接口
router.post("/register", userexisitvalidator, uservalidator, cryptPassword, register)
    // 用户登录接口
router.post("/login", verifyLogin, login)
    // 修改密码接口
router.patch("/cwd", auth, cryptPassword, changePassword)
module.exports = router
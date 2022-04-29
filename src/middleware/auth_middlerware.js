/**
 * Token校验中间件
 */
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { HasNoAdminExist } = require("../constant/err_type")
const {
    tokenExpiredError,
    invalidToken,
    hasNotAdminPermission,
} = require('../constant/err_type')
    // 用户token认证中间件
const auth = async(ctx, next) => {
    // 从请求头中获得token,默认auth为空时能被请求得到
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
        // console.log(token)

    try {
        // user中包含了payload的信息(id, user_name, is_admin)
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        // token错误处理
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }
    // 通过验证
    await next()
}
const hasNoAdminExist = async(ctx, next) => {
    // 查询is_admin字段
    const is_admin = ctx.state.user.is_admin
        // console.log(is_admin);
        // 如果用户没有管理员权限
    if (!is_admin) {
        console.error("用户没有管理员权限");
        return ctx.app.emit("error", HasNoAdminExist, ctx)
    }
    await next()
}
module.exports = {
    auth,
    hasNoAdminExist
}
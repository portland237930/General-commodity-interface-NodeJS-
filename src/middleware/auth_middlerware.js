const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const {
    tokenExpiredError,
    invalidToken,
    hasNotAdminPermission,
} = require('../constant/err_type')
    // 用户token认证中间件
const auth = async(ctx, next) => {
    // 从请求头中获得token
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
module.exports = {
    auth
}
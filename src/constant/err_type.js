/**
 * 错误返回信息
 */
module.exports = {
    // 用户账号密码不存在返回信息
    userFormartErr: {
        code: "10001",
        message: "用户或密码不存在",
        result: ""
    },
    // 用户已经存在返回信息
    userAlreadyExisits: {
        code: "10002",
        message: "用户已经存在",
        result: ""
    },
    // 注册错误
    userRegisterError: {
        code: "10003",
        message: "用户注册错误",
        result: ""
    },
    // 用户不存在
    userDoesNotExist: {
        code: "10004",
        message: "用户不存在",
        result: ""
    },
    // 用户登录错误
    userLoginError: {
        code: "10005",
        message: "用户登陆失败",
        result: ""
    },
    // 密码错误
    invalidPassword: {
        code: "10006",
        message: "密码错误",
        result: ""
    },
    // Token过期
    tokenExpiredError: {
        code: "10101",
        message: "token过期",
        result: ""
    },
    // Token无效或不存在
    invalidToken: {
        code: "10102",
        message: "无效的token",
        result: ""
    },
    // 用户没有Admin权限
    HasNoAdminExist: {
        code: "10103",
        message: "没有管理员权限",
        result: ""
    }
}
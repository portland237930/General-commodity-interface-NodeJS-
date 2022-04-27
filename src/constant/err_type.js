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
    userDoesNotExist: {
        code: "10004",
        message: "用户不存在",
        result: ""
    },
    userLoginError: {
        code: "10005",
        message: "用户登陆失败",
        result: ""
    },
    invalidPassword: {
        code: "10006",
        message: "密码错误",
        result: ""
    }
}
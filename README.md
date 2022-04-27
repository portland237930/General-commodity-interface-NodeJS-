# npm 初始化
npm init -y
生成package.json文件
# git 初始化
git init
.git隐藏文件夹 git 本地仓库
git add . 将当前目录全部添加到仓库
# 提交项目
git commit -m '1-项目初始化'
# 显示项目版本
git log 
# 安装koa框架
npm install koa
# 编写最基本的app
// 项目入口文件
const Koa = require('koa')
    // 创建app实例
const app = new Koa()
    // 创建中间件
app.use((context, next) => {
    context.body = 'hello api'
})
app.listen(3000, () => {
    console.log("server is running in http://localhost:3000");

})
node main.js 启动应用
# 安装Nodemon 自动重启服务
npm i nodemon
    "scripts": {
        "dev": "nodemon ./src/main.js",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
# 读取配置文件
安装dotenv
在主目录创建.env 设置APP_PORT=8000
在src文件下设置config文件下的config_default.js文件 设置端口配置
# 添加路由
安装koa-router
npm install koa-router
步骤:
1.导入包 
2.编写路由 创建src/router文件夹 编写user.route.js
 3.写入中间件 app.use(UserRouter)
 # 优化路由
 创建controller文件夹在user.controller.js下编写用户业务
 在user.route.js中注册用户登录和用户注册接口
 # 解析body
 1.安装koa-body 导入模块 const 
2.使用中间件 app.use(KoaBody)
3.在user.controller.js中解析数据
# 拆分service
创建service/user.service.js 编写用户操作数据库逻辑
# 安装sequenlize 
npm i mysql2 sequenlize
创建db/seq.js 操作数据库 
在.env文件下编写配置文件
# 创建User模型
新建model/user.model.js文件
1.导入模块,创建数据模型
2.指定模型同步,导出User数据模型
# 添加用户
使用User.create方法使用户数据持久化
所有数据库的操作都在 Service 层完成, Service 调用 Model 完成数据库操作
改写src/service/user.service.js将用户模型的数据添加至数据库
改写user.controller.js文件将数据成功的结果返回
# 错误处理
在控制器中, 对不同的错误进行处理, 返回不同的提示错误提示, 提高代码质量
校验用户已存在和用户密码不存在的情况,通过中间件流程控制后校验
# 拆分中间件
将错误返回请求作为常量存至consitant/err_type.js文件中
将错误处理函数存至app/errhandler.js文件中通过校验码code获得状态码
# 统一错误处理
在出错的地方使用ctx.app.emit提交错误
在app中通过app.on监听
# 使用trycatch优化错误处理
调用service层的时候会返回一个Promise对象,需要用async和await表达式对Promise对象进行解析,使用trycatch流程控制
在service层数据未被接收到时可以及时响应错误
在user_controller.js中创建数据字段时添加错误处理
在user_validate.js中添加错误处理
# 用户加密
npm i bcryptjs 安装bcryptjs
构建密码加密中间件 cryptPassword
# 密码验证
创建verifylogin中间件进行密码校验
使用getUserInfo方法通过user_name查询数据库判断用户是否存在,如果错误就发送错误请求到错误处理函数
通过bcrypt.compareSync(password, res.password)判断密码是否匹配,如果错误就发送错误请求到错误处理函数

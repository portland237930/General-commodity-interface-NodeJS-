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
git log --pretty=oneline
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
# 颁发token
安装jsonwebtoken npm i jsonwebtoken
在用户登录请求函数中通过请求的user_name向数据库发起请求获得除了密码的信息
将得到的信息作为校验信息并在.env下创建密钥,设置过期时间通过jwt.sign的结果作为token返回给用户
# 用户认证
创建auth中间件 使用auth函数处理请求获得的token,将token使用verify方法解码后添加到ctx.state.user中
添加错误处理,将token过期和token无效的错误处理信息添加到error_type中
在user.router.js文件中添加router.patch方法添加修改密码接口
在postman中添加token全局变量
在用户登录测试接口的Tests中
pm.test("Successful POST request", function () {
    // 响应结果转换格式
    const res=pm.response.json()
    // 设置token变量
    pm.collectionVariables.set('token',res.result.token);
});
使用户登录接口的token自动变为全局变量
# 修改密码接口
在修改密码接口中增加密码加密中间件cryptPassword,在user.controller.js文件中添加changePassword回调函数
在changePassword中通过service层的updateById方法操作数据库中的字段
通过更新数据库操作返回的值判断是否成功更改密码,返回成功或返回的值到ctx.body中
# 创建上传商品接口
新建router/goods.route.js文件并以post请求创建上传商品接口
新建controller/goods.controller.js文件创建upload回调函数
# 路由自动加载
在router中新建index.js文件通过fs.readdirSync同步读取当前路径下的所有文件实现自动加载
# 管理员权限校验
对上传图片接口使用auth中间件进行Token校验和管理员校验
创建hasNoAdminExist中间件校验数据库中is_admin字段是否为1发起错误处理函数
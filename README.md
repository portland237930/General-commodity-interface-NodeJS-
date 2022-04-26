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

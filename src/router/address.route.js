/**
 * 地址路由模块
 */
// 引入路由
const Router = require("koa-router")
    // 创建实例化对象
const router = new Router({ prefix: "/address" })
    // 引入中间件和控制器
const { auth } = require("../middleware/auth_middlerware")
const { validator } = require("../middleware/address_middleware")
const { AddressCommit, GetAddressList, updateAddress, DeleteAddress, ChangeDefaultAddres } = require("../controller/addresscontroller")
    // 编写路由规则
    // 添加地址接口
router.post("/addaddress", auth, validator({
        // 指定校验格式
        consignee: "string",
        phone: {
            type: "string",
            format: /^1\d{10}$/
        },
        address: 'string',
    }), AddressCommit)
    // 获取地址接口
router.get("/getaddress", auth, GetAddressList)
    // 修改地址接口
router.put("/updateaddress/:id", auth, validator({
            // 指定校验格式
            consignee: "string",
            phone: {
                type: "string",
                format: /^1\d{10}$/
            },
            address: 'string',
        }),
        updateAddress)
    // 删除地址接口
router.delete("/delete/:id", auth, DeleteAddress)
    // 修改默认地址接口
router.patch("/changeDefault/:id", auth, ChangeDefaultAddres)
    // 导出路由
module.exports = router
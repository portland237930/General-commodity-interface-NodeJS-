/**
 * 商品接口业务模块
 */
// 引入模块
const path = require('path');
// 引入错误信息
const { FileUploadError, UnSupportFileError } = require("../constant/err_type")
class GoodsController {
    // 上传图片请求
    async upload(ctx, next) {
        // 解析出上传文件
        const { file } = ctx.request.files
        console.log(file);
        const fileTypes = ['image/jpeg', 'image/png']
            // 如果上传成功
        if (file) {
            // 判断文件类型
            if (!fileTypes.includes(file.type)) {
                return ctx.app.emit("error", UnSupportFileError, ctx)
            }
            // 返回成功信息
            ctx.body = {
                code: "0",
                message: "上传图片成功",
                result: {
                    goods_img: path.basename(file.filepath)
                }
            }
        } else {
            console.error("图片上传失败")
            return ctx.app.emit("error", FileUploadError, ctx)
        }
    }
}
module.exports = new GoodsController()
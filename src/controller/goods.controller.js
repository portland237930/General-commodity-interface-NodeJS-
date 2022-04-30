/**
 * 商品接口业务模块
 */
// 引入模块
const path = require('path');
// 引入错误信息
const { FileUploadError, UnSupportFileError, publishGoodsError, invalidGoodsId } = require("../constant/err_type")
const { createGoods, updategoods, deletegoods, restoregoods, findAll } = require("../service/goods.service")
class GoodsController {
    // 上传图片回调
    async UploadPictures(ctx, next) {
            // 解析出上传文件
            const { file } = ctx.request.files
            console.log(file);
            const fileTypes = ['image/jpeg', 'image/png']
                // 如果上传成功
            if (file) {
                // 判断文件类型
                if (!fileTypes.includes(file.mimetype)) {
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
        // 发布商品回调
    async PubGoods(ctx, next) {
            try {
                // 发起创建商品请求
                const res = await createGoods(ctx.request.body)
                    // 发起请求成功
                if (res) {
                    // 返回成功信息
                    ctx.body = {
                        code: "0",
                        message: "发布商品成功",
                        result: res
                    }
                }
            } catch (error) {
                console.error("商品发布失败", error);
                ctx.app.emit("error", publishGoodsError, ctx)
            }
        }
        // 更新商品回调
    async UpdateGoods(ctx, next) {
            try {
                const res = await updategoods(ctx.params.id, ctx.request.body)
                    // 如果更新成功
                if (res) {
                    // 返回成功信息
                    ctx.body = {
                        code: "0",
                        message: "商品更新成功",
                        result: ""
                    }
                } else {
                    // 如果商品ID不存在
                    ctx.app.emit("error", invalidGoodsId, ctx)
                }
            } catch (error) {
                console.error("商品更新失败", error);
            }
        }
        // 下架商品回调
    async DeleteGoods(ctx) {
            // 等待商品结果
            const res = await deletegoods(ctx.params.id)
                // console.log(res);
                // 判断删除是否成功
            if (res) {
                ctx.body = {
                    code: "0",
                    message: "下架商品成功",
                    result: ""
                }
            } else {
                ctx.app.emit("error", invalidGoodsId, ctx)
            }
        }
        // 上架商品回调
    async RestoreGoods(ctx) {
            const res = await restoregoods(ctx.params.id)
            if (res) {
                ctx.body = {
                    code: "0",
                    message: "商品上架成功",
                    result: ""
                }
            } else {
                ctx.app.emit("error", invalidGoodsId, ctx)
            }
        }
        // 获取商品列表回调
    async findAllGoods(ctx) {
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const res = await findAll(pageNum, pageSize)
        if (res) {
            ctx.body = {
                code: 0,
                message: "获取商品列表成功",
                result: res
            }
        }
    }
}
module.exports = new GoodsController()
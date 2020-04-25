const express = require("express");
const router = express.Router();
const { addFoods, checkAllFoods, removeFood, modifyFood, pageFoods, classifyFood, keywordFood } = require("../control/foodControl");
// 添加菜品
/**
 * @api {post} /food/add 添加菜品
 * @apiName add
 * @apiGroup Food
 *
 * @apiParam {String} name 菜品名字.
 * @apiParam {String} price 菜品价格.
 * @apiParam {String} desc 菜品描述.
 * @apiParam {String} img 菜品图片.
 * @apiParam {String} foodType 菜品类别.
 *
 * @apiSuccess {String} err 状态码
 * @apiSuccess {String} msg 信息提示.
 */

router.post("/add", (req, res) => {
        // 接受数据
        let { name, price, desc, img, foodType } = req.body;
        // 处理数据
        addFoods({ name, price, desc, img, foodType })
            .then(() => {
                res.send({ err: 0, msg: "添加成功" });
            })
            .catch((err) => {
                res.send({ err: -1, msg: "添加失败" });
            })
            // 返回信息

    })
    // 查询所有的菜品
    /**
     * @api {post} /food/check 查询所有菜品
     * @apiName check
     * @apiGroup Food
     * @apiSuccess {String} err 状态码
     * @apiSuccess {String} msg 信息提示.
     */
router.post("/check", (req, res) => {
    let { _id } = req.body;
    checkAllFoods(_id)
        .then((infos) => {
            res.send({ err: 0, msg: "查询成功", list: infos });
        })
        .catch((err) => {
            res.send({ err: -1, msg: "查询失败" });
        })
})

// 删除菜品
/**
 * @api {post} /food/del 删除菜品
 * @apiName del
 * @apiGroup Food
 *
 * @apiParam {String} _id 主键.
 
 * @apiSuccess {String} err 状态码
 * @apiSuccess {String} msg 信息提示.
 */
router.post("/del", (req, res) => {
        let { _id } = req.body;
        removeFood(_id)
            .then(() => {
                res.send({ err: 0, msg: "删除成功" })
            })
            .catch((err) => {
                res.send({ err: -1, msg: "删除失败" })
            })

    })
    // 修改菜品
    /**
     * @api {post} /food/Modify 修改菜品
     * @apiName Modify
     * @apiGroup Food
     *
     * @apiParam {String} name 菜品名字.
     * @apiParam {String} price 菜品价格.
     * @apiParam {String} desc 菜品描述.
     * @apiParam {String} img 菜品图片.
     * @apiParam {String} foodType 菜品类别.
     *@apiParam {String} _id 主键.

     * @apiSuccess {String} err 状态码
     * @apiSuccess {String} msg 信息提示.
     */
router.post("/Modify", (req, res) => {
    let { _id, name, price, desc, img, foodType } = req.body;
    modifyFood(_id, { name, price, desc, img, foodType })
        .then(() => {
            res.send({ err: 0, msg: "修改成功" });
        })
        .catch((err) => {
            res.send({ err: -1, msg: "修改失败" })
        })
})

// 分页查询
/**
    * @api {post} /food/page 分页查询
    * @apiName page
    * @apiGroup Food
    *
    * @apiParam {String} page 页数.
    * @apiParam {String} pageSize 页面数.
    * @apiParam {String} allFoods 商品数量.
    

    * @apiSuccess {String} err 状态码
    * @apiSuccess {String} msg 信息提示.
    */
router.post("/page", (req, res) => {
    let page = req.body.page || 1;
    let pageSize = req.body.pageSize || 2
    pageFoods(page, pageSize)
        .then((data) => {
            let { result, allFoods } = data;
            res.send({ err: 0, msg: "分页成功", list: result, allFoods });
        })
        .catch((err) => {
            res.send({ err: -1, msg: "分页失败" })
        })

})

// 分类查询
/**
 * @api {post} /food/classify 分类查询
 * @apiName classify
 * @apiGroup Food
 *
 * @apiParam {String} foodType 菜品类别.
 * @apiSuccess {String} err 状态码
 * @apiSuccess {String} msg 信息提示.
 */
router.post("/classify", (req, res) => {
    let { foodType } = req.body;
    classifyFood(foodType)
        .then((data) => {
            res.send({ err: 0, msg: "分类查询成功", data });
        })
        .catch((err) => {
            res.send({ err: -1, mag: "分类查询失败" });
        })
})

// 关键字查询
/**
    * @api {post} /food/Modify 关键字查询
    * @apiName Modify
    * @apiGroup Food
    *
    * @apiParam {String} kw 关键字查询.
    

    * @apiSuccess {String} err 状态码
    * @apiSuccess {String} msg 信息提示.
    */
router.post("/keyword", (req, res) => {
    let kw = req.body.kw || ''
    let page = req.body.page || 1
    let pageSize = req.body.pageSize || 2
    keywordFood(kw, page, pageSize)
        .then((data) => {
            res.send({ err: 0, msg: '查询成功', list: data.result, allFoods: data.allCount })
        })
        .catch((err) => { res.send({ err: -1, msg: '查询失败请重试' }) })
});
module.exports = router

// 删除菜品
// 修改菜品
// 查询菜品 分页查询 模糊查询 分类查询
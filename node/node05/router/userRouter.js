const express = require("express");
const router = express.Router();
const tokenMiddleWare = require("../middleware/tokenmiddleware");
let Mail = require("../uitls/mail.js");
const { userReg, userLogin, logOut } = require("../control/userControl.js");
let mails = {};
// 用户相关的路由
/*
1 注册
   接受用户 邮箱 密码 验证码
   1. 验证码ok
   2. 用户是否存在
   3. 注册
2 获取验证码
   用户发一个邮箱
   我给邮箱发一个验证码
3 登录
*/

/**
 * @api {post} /admin/getCode  获取邮箱验证码
 * @apiName getCode
 * @apiGroup User
 *
 * @apiParam {String} mail  注册邮箱.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post("/getCode", (req, res) => {
        let { mail } = req.body;
        let code = parseInt(Math.random() * 9999);
        Mail.send(mail, code)
            .then(() => {
                mails[mail] = code;
                res.send({ err: 0, msg: "验证码正确" })
            })
            .catch((err) => {
                console.log(err);
                res.send({ err: -1, msg: "验证码错误" });
            })
    })
    // 注册

/**
 * @api {post} /admin/reg  邮箱注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} mail  注册邮箱.
 * @apiParam {String} code  验证码.
 * @apiParam {String} pass  注册密码.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post("/reg", (req, res) => {
    let { mail, pass, code } = req.body;
    if (code == mails[mail]) {
        userReg(mail, pass)
            .then(() => {
                res.send({ err: 0, msg: "注册ok" });
            })
            .catch((err) => {
                console.log(err);

                res.send({ err: -1, msg: "注册nook" });
            })
    }
});

// 登录
/**
 * @api {post} /admin/login  邮箱登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} mail  注册邮箱.
 * @apiParam {String} pass  注册密码.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post("/login", (req, res) => {
    let { mail, pass } = req.body;
    userLogin(mail, pass).then((info) => {
            res.send({ err: 0, msg: "登录成功", userInfo: info });
        })
        .catch((err) => {
            console.log(err);
            res.send({ err: -1, msg: err });
        })
})

// 退出登录 也需要验证token
router.post("/logout", tokenMiddleWare, (req, res) => {
    let { _id } = req.body
        // 数据库里的token的清空
    logOut(_id)
        .then(() => {
            res.send({ err: 0, msg: "退出ok" })
        })
})
module.exports = router
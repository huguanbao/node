const express = require("express");
const router = express.Router();
let foodModule = require("../db/module.js");

// 注册
router.get("/reg", (req, res) => {
    // 接收数据
    let { user, pass } = req.query;
    // 处理数据 
    foodModule.insertMany({ user, pass })
        .then((data) => {
            res.send({ err: 0, msg: "注册成功" });
            console.log("then", data);
        })
        .catch((err) => {
            res.send({ err: -1, msg: "注册失败" });
            console.log("catch", err);
        })


})

// 登录
router.get("/login", (req, res) => {
    let { user, pass } = req.query;
    foodModule.find({ user, pass })
        .then((data) => {
            if (data.length == 1) {
                res.send({ err: 0, msg: "登录成功" });
            } else {
                res.send({ err: -1, msg: "失败" });
            }
            console.log("then", data);
        })
        .catch((err) => {
            console.log("catch", err);
        })

})
module.exports = router;
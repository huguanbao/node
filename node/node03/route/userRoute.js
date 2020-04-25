const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.send("这里是登录");
})
router.get("/reg", (req, res) => {
    res.send("这里是注册");
})

module.exports = router;
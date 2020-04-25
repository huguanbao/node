// 接口
const express = require("express");
const app = express();
let db = require("../db/db.js");
let userRouter = require("./userRouter");


app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("服务器启动");
})
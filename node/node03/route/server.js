const express = require("express");
const app = express();

let userRouter = require("./userRoute")
app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("服务器启动");
})
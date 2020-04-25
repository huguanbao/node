const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

var upload = multer({});

app.use("/pulic", express.static(path.join(__dirname, "./www")))
    // 图片上传必须用post

app.post("/file", upload.single('xixi'), (req, res) => {
    // res.setEconding("utf8");
    // 先获取上传图片的信息
    console.log(req.file);
    let { buffer, fieldname, mimetype, size, originalname } = req.file;
    let name = (new Date()).getTime();
    let t = originalname.slice(-4);
    fs.writeFile(path.join(__dirname, `./www/${name}${t}`), buffer, (err) => {
        if (err) {
            res.send("图片上传失败");

        } else {
            res.send("图片上传成功");
        }

    })

})

app.listen(3000, () => {
    console.log("服务器启动");

})
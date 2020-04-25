/*
创建文件 writeFile
删除文件 unlink
修改文件 appendFile
读取文件 readFile
*/
let fs = require("fs");
fs.writeFile("./email.js", "呵呵", (err) => {
    console.log(err);
});

// fs.unlink("./hehe", (err) => {
//     console.log(err);

// })
// fs.appendFile("./demo/xixi.txt", "哈哈1223", (err) => {
//     console.log(err);

// });

// fs.readFile("./hehe.txt", "utf8", (err, data) => {
//     console.log(err);
//     console.log(data);
// });
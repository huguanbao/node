###  中间件


### 目录树
const fs = require('fs');
const path = require('path')

function loaddir(tagdir, deep) {
    let pre = new Array(deep).join('┃  ')
        //随着深度增加 前面的占位符
    let infos = fs.readdirSync(tagdir)

    let files = []
    let dirs = []
    infos.forEach(item => {
        let tmpdir = path.join(tagdir, item)
        let state = fs.statSync(tmpdir)
        if (state.isFile()) {
            files.push(item)
        } else {
            dirs.push(item)
        }
    });
    //文件夹打印并递归
    dirs.forEach(item => {
        console.log(`${pre}┣━${item}`)
            //递归
            //    console.log(tagdir)
        let nexttarget = path.join(tagdir, item)
            //    console.log(nexttarget)
        let nextdeep = deep + 1
        loaddir(nexttarget, nextdeep)
    });
    //文件打印
    let count = files.length - 1
    files.forEach(item => {
        if (count--) {
            console.log(`${pre}┣━${item}`)
        } else {
            console.log(`${pre}┗━${item}`)
        }
    });
}

loaddir(__dirname, 1)
    //deep
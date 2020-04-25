const request = require('request');
const cheerio = require("cheerio");
const fs = require("fs");
let url = "https://www.baidu.com";
request(url, function(error, response, body) {
    console.error('error:', error);
    // 错误信息
    console.log('statusCode:', response && response.statusCode);
    // 状态码
    let $ = cheerio.load(body)
    $('img').each((index, el) => {
            console.log('图片' + index)
            let imgSrc = $(el).attr('src')
                // 给没有协议的连接地址添加协议
            if (imgSrc.indexOf('http://') === -1) {
                imgSrc = 'http:' + imgSrc
            }
            console.log(imgSrc);

            loadImg(index, imgSrc)
        })
        // 数据

});

function loadImg(index, src) {
    request(src)
        .pipe(fs.createWriteStream(`./${index}.png`))
        // pipe 管道符号 

}
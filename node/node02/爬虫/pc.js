const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');
let url = "https://www.qunar.com/";

https.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            // fs.writeFile("./nba.html", rawData, (err) => {
            //     if (err) {
            //         console.log("下载失败");
            //     } else {
            //         console.log("下载成功");
            //     }

            // });
            const $ = cheerio.load(rawData)
            $('img').each((index, el) => {
                console.log('图片' + index)
                console.log($(el).attr('src'))
            })
        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
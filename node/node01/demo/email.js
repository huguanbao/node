// 引入第三方模块
const nodemailer = require("nodemailer");
//创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '3385075363@qq.com', // 发送方邮箱账号
        pass: 'ivrrzgfnclmfdabf' // 邮箱的授权码
    }
});
// 邮件的内容
let content = {
        from: '"Fred Foo 👻" <3385075363@qq.com>', // sender address
        to: "3385075363@qq.com", // list of receivers
        subject: "Hello ✔", // Subject line

        html: "<b>欢迎光临逆战1911</b>" // html body
    }
    //调用sendMail方法发送 
transporter.sendMail(content, (err) => {
    console.log(err)
});
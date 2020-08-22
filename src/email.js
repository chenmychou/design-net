const nodemailer = require('nodemailer');
const config = require('../config')
　　// 创建可重用邮件传输器
　　const transporter = nodemailer.createTransport({
　　　　host: config.emailCfg.host, // 网易的邮件地址
　　　　port: 465, // 端口
　　　　secureConnection: false, // use SSL
　　　　auth: config.emailCfg.auth
　　});
　module.exports = {
    send: (mailOptions) => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
  　　　　　　if (error) {
                reject(error)
  　　　　　　　　return console.log(error);
  　　　　　　}
            resolve(info)
  　　　　　　console.log('Message send: %s', info.messageId);
  　　　　})
      })
  　　　　
  　}
}
 
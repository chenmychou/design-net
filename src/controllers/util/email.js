/*
 * @Author: chenmy
 * @Date: 2020-07-27 17:26:05
 * @LastEditTime: 2020-08-07 20:03:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /design-net/src/controllers/util/email.js
 */ 
const fs = require('fs')
const path = require('path')
const send = require('../../email')
const nodemailer = require('nodemailer');
const config = require('../../../config')
const loginModule = require('../../module/loginModule')
const emailFunc = require('../../email')
const router = require('koa-router')({prefix: config.preFix})
router.post('/sendEmail', async (ctx, next) => {
  let emailUrl = ctx.request.body.emailUrl
  // 发送验证邮件
  const sixMathVerifyCode = () => {
      var Num= "";
      for(var i=0;i<6;i++)
      {
          Num+=Math.floor(Math.random()*10);
      }
      return Num;
  }
    let verifyCode = sixMathVerifyCode()
    let checkEmail = await loginModule.findEmail(emailUrl)
    if (checkEmail.length === 0) {
      let emailResult = await loginModule.insertEmailInfo([emailUrl, verifyCode])
      if (!emailResult || emailResult.affectedRows === 0) {
        return ctx.body = {
          code: 500,
          data: null,
          msg: 发送失败
        }
      }
    } else {
      let emailUpdateInfo = await loginModule.updateEmailInfo([verifyCode, emailUrl]) 
      if (!emailUpdateInfo || emailUpdateInfo.affectedRows === 0) {
        return ctx.body = {
          code: 500,
          data: null,
          msg: 发送失败
        }
      }
    }
　　let email = {
　　title: '欢迎注册设计沙箱--邮箱验证码',
　　htmlBody: '<h1>您好!</h1><p style="font-size: 14px;color:#777;">您正在进行账号注册操作，如果您不希望继续这个操作，请忽略此邮件！</p><p style="font-size: 18px;color:#000;">设计沙箱的注册验证码为：<u style="font-size: 16px;color:#1890ff;">' + verifyCode + '</u></p><p style="font-size: 14px;color:#666;">10分钟内有效</p><p style="font-size: 12px;color:#000;">设计沙箱团队</p>'
　　}
　　let mailOptions = {
　　　　from: config.emailCfg.sentEmailUrl, // 发件人地址
　　　　to: emailUrl, // 收件人地址，多个收件人可以使用逗号分隔
　　　　subject: email.title, // 邮件标题
　　　　html: email.htmlBody // 邮件内容
　　};  
  let result = await emailFunc.send(mailOptions)
  let msgData = '发送成功'
  if (!result.messageId) {
    msgData = "发送失败"
  }
  ctx.body = {
    code: msgData === '发送成功' ? 200 : 500,
    data: null,
    msg: msgData
  };
});

module.exports = router

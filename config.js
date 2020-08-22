/*
 * @Author: your name
 * @Date: 2020-07-16 09:59:49
 * @LastEditTime: 2020-08-06 18:40:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /design-net/config.js
 */ 
module.exports =  {
  mysqlCfg: {
    host: 'localhost', // 填写你的mysql host
    user: 'root', // 填写你的mysql用户名
    database: 'design_tb', // 填写你的mysql数据库名
    password: 'Zou895849097', // 填写你的mysql数据库密码
    multipleStatements: true
  },
  emailCfg: {
    host: 'smtp.163.com',
    sentEmailUrl: 'chenmychou@163.com',
    auth: {
      "user": 'chenmychou@163.com', // 邮箱账号
      "pass": 'YNZLWROCEUEMJDZI' // 邮箱的授权码  YNZLWROCEUEMJDZI
　　 }
  },
  port: 3000,
  preFix: '/sys'
}
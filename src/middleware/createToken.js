/*
 * @Author: chenmy
 * @Date: 2020-06-05 19:30:49
 * @LastEditTime: 2020-08-22 10:53:39
 * @LastEditors: Please set LastEditors
 * @Description: 创建token
 * @FilePath: /design-net/src/middleware/createToken.js
 */ 
const jwt = require('jsonwebtoken');
const query = require('./mysql')
const saveToken = (val) => { // 查找所有类目
  let _sql = `update user_tab set token="${val[0]}" where id=${val[1]};`
  return query(_sql)
}
// 创建token
//登录时：核对用户名和密码成功后，应用将用户的id 作为JWT Payload的一个属性
module.exports = function(user){
    const token = jwt.sign({
        passWord: user.passWord,
        userName: user.userName,
    }, 'design', {    // "youhui"  是校验码    解析时需要一致 才能取到 user 信息
        expiresIn: '24h' //过期时间设置为24h 格式有(s, m, h , day)。那么decode这个token的时候得到的过期时间为 : 创建token的时间 +　设置的值
    });
    console.log('创建token==>', token,user.id)
    saveToken([token,user.id])
    return token;
};
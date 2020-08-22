/*
 * @Author: your name
 * @Date: 2020-06-05 18:54:25
 * @LastEditTime: 2020-08-22 11:16:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /design-net/src/module/loginModule.js
 */ 
const query = require('../middleware/mysql')

const updateUserInfo = function( value ) {
  let _sql = "update user_tab set useName=?,password=?  where email=?;"
  return query( _sql, value )
}
const saveTokenToUser = function( value ) {
  let _sql = "update user_tab set token=?  where useName=?;"
  return query( _sql, value )
}
const insertEmailInfo = function( value ) {
  let _sql = "insert into user_tab set email=?,verifycode=?,codeTime=now();"
  return query( _sql, value )
}
const updateEmailInfo = function( value ) {
  let _sql = "update user_tab set verifycode=?,codeTime=now() where email=?"
  return query( _sql, value )
}
const findEmail = (val) => { // 查找邮箱是否存在
  let _sql = `SELECT * FROM user_tab WHERE email = '${val}'`
  return query(_sql)
}
const findVerifycode = (val) => { // 验证码是否存在
  console.log('findVerifycode==>>>', val)
  let _sql = `SELECT * FROM user_tab WHERE email = '${val}'`
  return query(_sql)
}

const findUser = (val) => { // 查找所有User
  let _sql = `select id,useName,nickName,headImg,email,phone,slogan,sex,birthday,city,province,industry,job,company,weibo,wechat,qq,website FROM user_tab WHERE useName="${val[0]}" and password="${val[1]}"`
  return query(_sql)
}
const findAllUser = (val) => { // 查找所有User
  let _sql = `SELECT * FROM user_tab`
  return query(_sql)
}
const deteleAdmin = function( value ) {
  let _sql = `DELETE FROM user_tab WHERE id = '${value}'`
  return query( _sql )
}

const insertAdmin = function( value ) {
  let _sql = "insert into user_tab set useName=?, password=?;"
  return query( _sql, value )
}
const updateAdmin = function( value ) {
  let _sql = "update user_tab set usename=?, password=? where id=?"
  return query( _sql, value )
}
const getUserInfoByToken = function( value ) {
  let _sql = `select id as from_userid from user_tab where token="${value}"`
  return query( _sql, value )
}


module.exports = {
  updateUserInfo,
  saveTokenToUser,
  findVerifycode,
  insertEmailInfo,
  updateEmailInfo,
  findEmail,
  findUser,
  findAllUser,
  insertAdmin,
  deteleAdmin,
  updateAdmin,
  getUserInfoByToken
}
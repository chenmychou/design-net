/*
 * @Author: chenmy
 * @Date: 2020-06-05 18:54:25
 * @LastEditTime: 2020-08-06 18:58:52
 * @LastEditors: Please set LastEditors
 * @Description: chenmy
 * @FilePath: /design-net/src/module/loginModule.js
 */ 
const query = require('../middleware/mysql')

const findCategoryList = (val) => { // 查找所有类目
  let _sql = `SELECT * FROM category_tab`
  return query(_sql)
}
const saveCategoryItem = function( value ) { // 保存或添加大类目
  let _sql = "update category_tab set title=?,coverImg=?  where categoryid=?;"
  if (!value[2]) {
    _sql = "insert into category_tab set title=?,coverImg=?;"
  }
  return query( _sql, value )
}
const deleteCategoryItem = function( value ) { // 删除大类目
  let _sql = `DELETE FROM category_tab WHERE categoryid = '${value}'`
  return query( _sql )
}
const getRankListByCategoryId = (val) => { // 查找某个用户某个大类下的所有能打开的关卡
  let _sql = `SELECT * FROM course_tab WHERE sort <= ((SELECT course_tab.sort from course_tab WHERE courseid = (SELECT days_tab.courseid from days_tab WHERE userid=${val[1]} and categoryid=${val[0]}) and categoryid=${val[0]})+1)`
  console.log('_sql_sql_sql', _sql)
  // let _sql = `SELECT course_tab.sort FROM days_tab right join course_tab  on days_tab.userid=${val[1]} and days_tab.categoryid=course_tab.categoryid=${val[0]};`
  return query(_sql)
}
const getRankByCategoryId = (val) => { // 查找某个用户某个大类下的下一步解锁的关卡
  let _sql = `SELECT * FROM course_tab WHERE sort = ((SELECT course_tab.sort from course_tab WHERE courseid = (SELECT days_tab.courseid from days_tab WHERE userid=${val[1]} and categoryid=${val[0]}) and categoryid=${val[0]})+1)`
  return query(_sql)
}
const saveWorkByImg = (val) => { // 保存作品    title description  workImg userid courseid categoryid workid
  console.log('saveWorkByImgsaveWorkByImg==>', val)
  let _sql = `insert into works_tab set title=?,description=?,workImg=?,userid=?,courseid=?,categoryid=?,publishTime=now();insert into days_tab set userid=${val[3]},courseid=${val[4]},categoryid=${val[5]},updateTime=now();`
  if (val[7]) {
    _sql = `update works_tab set title=?,description=?,workImg=?,userid=?,courseid=?,categoryid=?,publishTime=? where workid=?;`
  }
  return query(_sql, val)
}
const saveWorkRecord = (val) => { // 保存关卡记录    title description  workImg userid courseid categoryid workid
  let _sql = "insert into days_tab set userid=?,courseid=?,categoryid=?;"
  if (val[7]) {
    _sql = `update days_tab set userid=?,courseid=?,categoryid=? where categoryid=?;`
  }
  return query(_sql, val)
}
// const getOpenRankByCategoryId = (val) => { // 查找某个大类下的打开的关卡
//   let _sql = `SELECT * FROM course_tab WHERE categoryid = '${val}'`
//   return query(_sql)
// }

// const insertEmailInfo = function( value ) {
//   let _sql = "insert into user_tab set email=?,verifycode=?,codeTime=?;"
//   return query( _sql, value )
// }
// const updateEmailInfo = function( value ) {
//   let _sql = "update user_tab set verifycode=? where email=?"
//   return query( _sql, value )
// }
// const findEmail = (val) => { // 查找邮箱是否存在
//   let _sql = `SELECT * FROM user_tab WHERE email = '${val}'`
//   return query(_sql)
// }
// const findVerifycode = (val) => { // 验证码是否存在
//   console.log('findVerifycode==>>>', val)
//   let _sql = `SELECT * FROM user_tab WHERE email = '${val}'`
//   return query(_sql)
// }

// const getRankByCategoryId = (val) => { // 查找所有User
//   let _sql = `SELECT * FROM user_tab WHERE useName = '${val}'`
//   return query(_sql)
// }
// const findAllUser = (val) => { // 查找所有User
//   let _sql = `SELECT * FROM user`
//   return query(_sql)
// }
// const deleteCategoryItem = function( value ) {
//   let _sql = `DELETE FROM user_tab WHERE id = '${value}'`
//   return query( _sql )
// }

// const insertAdmin = function( value ) {
//   let _sql = "insert into user_tab set useName=?, password=?;"
//   return query( _sql, value )
// }
// const updateAdmin = function( value ) {
//   let _sql = "update user_tab set usename=?, password=? where id=?"
//   return query( _sql, value )
// }


module.exports = {
  findCategoryList,
  saveCategoryItem,
  deleteCategoryItem,
  getRankListByCategoryId,
  getRankByCategoryId,
  saveWorkByImg,
  // updateUserInfo,
  // findVerifycode,
  // insertEmailInfo,
  // updateEmailInfo,
  // findEmail,
  // findUser,
  // findAllUser,
  // insertAdmin,
  // deteleAdmin,
  // updateAdmin
}
/*
 * @Author: chenmy
 * @Date: 2020-08-07 20:10:41
 * @LastEditTime: 2020-08-08 09:04:51
 * @LastEditors: Please set LastEditors
 * @Description: 个人中心
 * @FilePath: /design-net/src/module/centerModule.js
 */ 
const query = require('../middleware/mysql')

const getUserInfo = function( value ) {
  let _sql = "select * from user_tab where token=?;"
  return query( _sql, value )
}
const saveUserBasicInfo = function( value ) { // headImg nickName slogan
  let _sql = "update user_tab set headImg=?,nickName=?,slogan=?  where token=?;"
  return query( _sql, value )
}
const saveMoreUserInfo = function( value ) { // sex birthday  province city industry  job company
  let _sql = "update user_tab set sex=?,birthday=?,province=?,city=?,industry=?,job=?,company=?  where token=?;"
  return query( _sql, value )
}
const saveSheJiaoUserInfo = function( value ) { // weibo wechat qq website
  let _sql = "update user_tab set weibo=?,wechat=?,qq=?,website=?,phone=?  where token=?;"
  return query( _sql, value )
}
const getRankList = function( value ) {
  let _sql = '(select id,nickName,headImg,c.courseCount from user_tab u join (select userid, count(courseid) as courseCount FROM works_tab GROUP BY userid) c on c.userid=u.id) ORDER BY c.courseCount DESC LIMIT 3;' // 计算每个用户的课程数并且排序
  if (value == 2) {
    _sql = '(select id,nickName,headImg,c.count from user_tab u join (select userid, sum(likenum) as count FROM works_tab GROUP BY userid) c on c.userid=u.id) ORDER BY c.count DESC LIMIT 3;' // 计算每个用户的点赞数并且排序
  }
  return query( _sql, value )
}

module.exports = {
  getUserInfo,
  saveMoreUserInfo,
  saveUserBasicInfo,
  saveSheJiaoUserInfo,
  getRankList
}
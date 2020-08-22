/*
 * @Author: chenmy
 * @Date: 2020-06-05 18:54:25
 * @LastEditTime: 2020-08-08 14:15:03
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
  let _sql = "update category_tab set title=?,coverImg=?,count=?  where categoryid=?;"
  if (!value[3]) {
    _sql = "insert into category_tab set title=?,coverImg=?,count=?;"
  }
  return query( _sql, value )
}
const isHasSortCourse = function( value ) { // 保存或添加课程 categoryid,courseid,title,desc,coverImg,viewcount,workName,workDesc,workImg,courseUrl,sort,zhuanfang
  let _sql = "select * from course_tab where categoryid=? and sort=?;"
  return query( _sql, value )
}
const saveCourseDetailByCategoryId = function( value ) { // 保存或添加课程 categoryid,courseid,title,desc,coverImg,viewcount,workName,workDesc,workImg,courseUrl,sort,zhuanfang
  let _sql = "update course_tab set title=?,courseDesc=?,coverImg=?,viewcount=?,workName=?,workDesc=?,workImg=?,courseUrl=?,sort=?,zhuanfang=?  where categoryid=? and courseid=?;"
  if (!value[11]) {
    _sql = "insert into course_tab set title=?,courseDesc=?,coverImg=?,viewcount=?,workName=?,workDesc=?,workImg=?,courseUrl=?,sort=?,zhuanfang=?,categoryid=?,publishTime=now();"
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
  let _sql = `insert into works_tab set title=?,description=?,workImg=?,userid=?,courseid=?,categoryid=?,publishTime=now();insert into days_tab set userid=${val[3]},courseid=${val[4]},categoryid=${val[5]},updateTime=now();`
  if (val[7]) {
    _sql = `update works_tab set title=?,description=?,workImg=?,userid=?,courseid=?,categoryid=?,publishTime=? where workid=?;`
  }
  return query(_sql, val)
}

const getAllCourseByCategoryId = (val) => { // 查找某个大类下的所有关卡
  let _sql = `SELECT courseid,title,coverImg,categoryid,sort,courseUrl,workDesc FROM course_tab WHERE categoryid=${val};`
  return query(_sql)
}

const setCourseCount = (val) => { // 设置当前类目下课程总数
  let _sql = `update category_tab set title=?,description=?,workImg=?,userid=?,courseid=?,categoryid=?,publishTime=? where workid=?;`
  return query(_sql)
}

const getAllCourseDetailByCategoryId = (val) => { // 查找某个大类下的所有关卡
  let _sql = `SELECT * FROM course_tab WHERE categoryid=${val[0]} and courseid=${val[1]};`
  return query(_sql)
}
const getWorksList = (val) => { // 查找所有作品
  let _sql = `SELECT * FROM works_tab ORDER BY publishTime DESC`
  if (val == 2) {
    _sql = `SELECT * FROM works_tab ORDER BY likenum DESC`
  }
  return query(_sql)
}


module.exports = {
  findCategoryList,
  saveCategoryItem,
  saveCourseDetailByCategoryId,
  deleteCategoryItem,
  getRankListByCategoryId,
  getRankByCategoryId,
  saveWorkByImg,
  getAllCourseByCategoryId,
  getAllCourseDetailByCategoryId,
  getWorksList,
  isHasSortCourse,
  setCourseCount
}
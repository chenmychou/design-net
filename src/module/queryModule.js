/*
 * @Author: your name
 * @Date: 2020-06-05 17:59:54
 * @LastEditTime: 2020-08-22 19:57:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /design-net/src/module/queryModule.js
 */ 
const query = require('../middleware/mysql')

const searchCourse = function( value ) {
  let _sql = `SELECT * FROM works_tab WHERE CONCAT(title, description) like '%${value}%';`
  return query( _sql )
}

/* 广告位开始*/
const findAllAd = function( value ) {
  let _sql = `SELECT * FROM ad_tab`
  return query( _sql )
}

const saveAdBrand = function( value ) {
  let _sql = "insert into ad_tab set adimg=?,adlink=?;"
  if (value[2]) {
    _sql = `update ad_tab set adimg=?,adlink=? where id=?`
  }
  return query( _sql, value )
}

const deteleAdBrand = function( value ) {
  let _sql = `DELETE FROM ad_tab WHERE id = '${value}'`
  return query( _sql )
}
/* 广告位结束*/

/* 资讯开始*/
const getNewsList = function( value ) { // newsTitle  newDesc newsid newsImgs
  let _sql = `SELECT newsTitle,newsid FROM news_tab`
  return query( _sql )
}

const getNewsDetail = function( value ) {
  let _sql = `SELECT * FROM news_tab where newsid=${value};`
  return query( _sql )
}

const saveNewsDetail= function( value ) {
  let _sql = "insert into news_tab set newsTitle=?,newDesc=?,newsImgs=?;"
  if (value[3]) {
    _sql = `update news_tab set newsTitle=?,newDesc=?,newsImgs=? where newsid=?;`
  }
  return query( _sql, value )
}
/* 资讯结束*/

/* 轮播开始*/
const getbannerBrand = function( value ) {
  let _sql = `SELECT * FROM banner_tab`
  return query( _sql )
}

const saveBannerBrand = function( value ) { // bannerImg, bannerUrl,title,id
  let _sql = "insert into banner_tab set bannerImg=?,bannerUrl=?,title=?;"
  if (value[3]) {
    _sql = `update banner_tab set bannerImg=?,bannerUrl=?,title=? where id=?;`
  }
  return query( _sql, value )
}

const deteleBannerBrand = function( value ) {
  let _sql = `DELETE FROM banner_tab WHERE id = '${value}'`
  return query( _sql )
}

/* 轮播结束*/

const worksList = (val) => { // 获取列表
  let _sql = `SELECT * FROM works_tab ORDER BY startTime DESC`
  return query(_sql)
}
const findAllWorks = function( value ) {
  console.log('value', value)
  const _sql = `SELECT * FROM works_tab WHERE type = '${value.type}' or description like '%${value.search}%'`;
  return query( _sql )
}
const deteleWorks = function( value ) {
  let _sql = `DELETE FROM works_tab WHERE id = '${value}'`
  return query( _sql )
}
const deteleAllWorks = function( value ) {
  let _sql = `DELETE FROM works_tab`
  return query( _sql, value )
}
const getAllCommet = function(value){
  const _sql = `select z.commetid,z.to_userid,z.from_userid,z.workid,z.replyid,z.content,z.from_useName,z.from_headImg,z.useName as to_useName,z.headImg as to_headImg from 
                  (select  * from((select c.commetid,c.to_userid,u.id as from_userid, c.workid,c.replyid,c.content,u.useName as from_useName,u.headImg as from_headImg from
                     commet_tab c left join user_tab u on c.from_userid=u.id ) b
                    left join  user_tab a on b.to_userid=a.id)) z  where z.workid=${value}`;
  return query( _sql )
}
const saveCommet = function( value ) { // 保存或新增评论（回复） from_userid,to_userid,content,likenum,workid,commetid
  let _sql = "insert into commet_tab set from_userid=?,to_userid=?,replyid=?,content=?,likenum=?,workid=?,commetTime=now();"
  if (value[6]) {
    _sql = "update commet_tab set from_userid=?,to_userid=?,replyid=?,content=?,likenum=?,workid=?,commetTime=now() where commetid=?;"
  }
  console.log('_sql_sql_sql', _sql)
  return query( _sql, value )
}
module.exports = {
  searchCourse,
  deteleAdBrand,
  getNewsList,
  getNewsDetail,
  saveNewsDetail,
  // worksList,
  findAllAd,
  saveAdBrand,
  getbannerBrand,
  saveBannerBrand,
  deteleBannerBrand,
  getAllCommet,
  saveCommet
  // findAllWorks,
  // deteleWorks,
  // deteleAllWorks
}
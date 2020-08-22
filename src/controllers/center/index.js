
/*
 * @Author: chenmy
 * @Date: 2020-06-07 08:40:19
 * @LastEditTime: 2020-08-08 09:09:04
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息
 * @FilePath: /design-net/src/controllers/commet/index.js
 */ 
const config = require('../../../config')
const  centerModule = require('../../module/centerModule')
const router = require('koa-router')({prefix: config.preFix})
const checkToken = require('../../middleware/checkAuth'); // 需要鉴权就加在路由里面

// router.get('/', ctx => {
//   ctx.body = '这是服务器首页';
// })
/**
 * @description: 获取当前排行榜数据
 * @param {type} 
 * @return: 
 */
router.get('/getRankList', checkToken, async ctx => {
  const {type} = ctx.query // type = 1 为课程数排序  type = 2  为点赞最多排序
  let result = await centerModule.getRankList(type)
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    data: result,
    msg: "操作成功"
  };
})
/**
 * @description: 获取当前用户信息
 * @param {type} 
 * @return: 
 */
router.get('/getUserInfo', checkToken, async ctx => {
  const token = ctx.get('token')
  let result = await centerModule.getUserInfo([token])
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    data: result[0],
    msg: "操作成功"
  };
})
/**
 * @description: 修改当前用户基本信息
 * @param {type} 
 * @return: 
 */
router.post('/saveUserBasicInfo', checkToken, async ctx => {
  const token = ctx.get('token')
  const {headImg,nickName,slogan} = ctx.request.body
  let result = await centerModule.saveUserBasicInfo([headImg,nickName,slogan,token])
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    data: null,
    msg: "操作成功"
  };
})
/**
 * @description: 修改当前用户详细信息
 * @param {type} 
 * @return: 
 */
router.post('/saveMoreUserInfo', checkToken, async ctx => {
  const token = ctx.get('token')
  const {sex,birthday,province,city,industry,job,company} = ctx.request.body
  let result = await centerModule.saveMoreUserInfo([sex,birthday,province,city,industry,job,company,token])
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    data: null,
    msg: "操作成功"
  };
})
/**
 * @description: 修改当前用户社交信息
 * @param {type} 
 * @return: 
 */
router.post('/saveSheJiaoUserInfo', checkToken, async ctx => {
  const token = ctx.get('token')
  const {weibo,wechat,qq,website,phone} = ctx.request.body
  let result = await centerModule.saveSheJiaoUserInfo([weibo,wechat,qq,website,phone,token])
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    data: null,
    msg: "操作成功"
  };
})
module.exports = router

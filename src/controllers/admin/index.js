/*
 * @Author: your name
 * @Date: 2020-07-28 18:16:24
 * @LastEditTime: 2020-08-07 08:50:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /design-net/src/controllers/course/index.js
 */ 
const config = require('../../../config')
const courseModule = require('../../module/courseModule')
const router = require('koa-router')({prefix: config.preFix})
const checkToken = require('../../middleware/checkAuth'); // 需要鉴权就加在路由里面

router.get('/', ctx => {
  ctx.body = '这是服务器首页';
})

// 获取所有大类目
// router.get('/categoryList', async ctx => {
//   let result = await courseModule.findCategoryList()
//   ctx.body = {
//     code: 200,
//     data: {
//       categoryList: result
//     },
//     msg: "操作成功"
//   };
// })
// // 添加、修改大类目
// router.post('/saveCategory', checkToken, async ctx => {
//   let {title, categoryid, coverImg} = ctx.request.body
//   let result = await courseModule.saveCategoryItem([title,coverImg,categoryid])
//   ctx.body = {
//     code: 200,
//     data: null,
//     msg: "操作成功"
//   };
// })
// // 删除大类目
// router.post('/deleteCategory', async ctx => {
//   let {categoryid} = ctx.query
//   let result = await courseModule.deleteCategoryItem(categoryid)
//   ctx.body = {
//     code: 200,
//     data: null,
//     msg: "操作成功"
//   };
// })
// // 查找某个用户某个大类下的所有能打开的关卡
// router.post('/getRankListByCategoryId',checkToken, async ctx => {
//   let {categoryid, userid} = ctx.query
//   let result = await courseModule.getRankListByCategoryId([categoryid,userid])
//   console.log('result==>>', result)
//   ctx.body = {
//     code: 200,
//     data: {
//       list: result
//     },
//     msg: "操作成功"
//   };
// })

// // 查找某个用户某个大类下的下一步解锁的关卡
// router.post('/getRankByCategoryId', /* checkToken , */  async ctx => {
//   let {categoryid, userid} = ctx.query
//   let result = await courseModule.getRankByCategoryId([categoryid,userid])
//   console.log('result==>>', result)
//   ctx.body = {
//     code: 200,
//     data: {
//       list: result
//     },
//     msg: "操作成功"
//   };
// })

// // 上一关提交后下一关状态变更
// /**
//  * @description: 保存当前用户作品及进度
//  * @param {type} 
//  * @return: 
//  */
// router.post('/saveWorkByImg', async ctx => { // title description  workImg userid courseid categoryid workid
//   let {title, description, workImg, userid, courseid, categoryid, workid} = ctx.request.body
//   let publishTime = new Date()
//   let result = await courseModule.saveWorkByImg([title, description, workImg, userid, courseid, categoryid, publishTime, workid])
//   console.log('getOpenRankByCategoryId==>>', result)
//   ctx.body = {
//     code: 200,
//     data: {
//       list: result
//     },
//     msg: "操作成功"
//   };
// })

// router.post('/saveWorkByImg', async ctx => { // title description  workImg userid courseid categoryid workid
//   let {title, description, workImg, userid, courseid, categoryid, workid} = ctx.request.body
//   let publishTime = new Date()
//   let result = await courseModule.saveWorkByImg([title, description, workImg, userid, courseid, categoryid, publishTime, workid])
//   console.log('getOpenRankByCategoryId==>>', result)
//   ctx.body = {
//     code: 200,
//     data: {
//       list: result
//     },
//     msg: "操作成功"
//   };
// })
// /**
//  * @description: 
//  * @param {type} 
//  * @return: 
//  */



// 删除全部数据
// router.get('/deleteAllWorks',checkToken, async ctx => {
//   let result = await queryModule.deteleAllWorks()
//   if (result.affectedRows === 0) {
//     return  ctx.body = {
//               code: 500,
//               msg: "无此数据"
//             };
//   }
//   ctx.body = {
//     code: 200,
//     msg: "所有数据删除成功"
//   };
// })
// 插入单条数据
// router.post('/addWorks',checkToken, async ctx => {
//  console.log('addWorksaddWorksaddWorksaddWorksaddWorks', ctx.request.body)
//   let {title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId} = ctx.request.body
//   let result = await queryModule.insertWorks([title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId])
//   console.log('result', result)
//   ctx.body = {
//     code: 200,
//     msg: `插入成功!`
//   }
// })
// 修改数据

// router.post('/updateWorks',checkToken, async ctx => {
//   let {title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId, id} = ctx.request.body
//   let result = await queryModule.updateWorks([title, description, link, startTime, endTime,activityStatus,tagName,tagImg,userId,id])
//   console.log('result', result)
//   ctx.body = {
//     code: 200,
//     msg: `修改成功`
//   };
// })
// 查找数据
// router.get('/getWorks', async ctx => {
//   let id = ctx.query.id;
//   let result = await queryModule.findWorks(id)
//   ctx.body = {
//     code: 200,
//     data: result[0] || null,
//     msg: '操作成功'
//   }
// })
// // 查找所有数据
// router.get('/getAllWorks', async ctx => {
//   let type = ctx.query.type; // 区分今天，明天  1，2
//   let search = ctx.query.search; // 搜索
//   let result = await queryModule.findAllWorks({type, search})
//   ctx.body = {
//     code: 200,
//     data: result || [],
//     msg: '操作成功'
//   }
// })
module.exports = router

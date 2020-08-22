/*
 * @Author: your name
 * @Date: 2020-07-28 18:16:24
 * @LastEditTime: 2020-08-08 18:16:23
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
router.get('/categoryList', async ctx => {
  let result = await courseModule.findCategoryList()
  ctx.body = {
    code: 200,
    data: {
      categoryList: result
    },
    msg: "操作成功"
  };
})
// 添加、修改大类目
router.post('/saveCategory', checkToken, async ctx => {
  let {title, categoryid, coverImg,count} = ctx.request.body
  let result = await courseModule.saveCategoryItem([title,coverImg,count,categoryid])
  ctx.body = {
    code: 200,
    data: null,
    msg: "操作成功"
  };
})
// 删除大类目
router.post('/deleteCategory', async ctx => {
  let {categoryid} = ctx.query
  let result = await courseModule.deleteCategoryItem(categoryid)
  ctx.body = {
    code: 200,
    data: null,
    msg: "操作成功"
  };
})
// 查找某个用户某个大类下的所有能打开的关卡
router.post('/getRankListByCategoryId',checkToken, async ctx => {
  let {categoryid, userid} = ctx.query
  let result = await courseModule.getRankListByCategoryId([categoryid,userid])
  console.log('result==>>', result)
  ctx.body = {
    code: 200,
    data: {
      list: result
    },
    msg: "操作成功"
  };
})

// 查找某个用户某个大类下的下一步解锁的关卡
router.post('/getRankByCategoryId', /* checkToken , */  async ctx => {
  let {categoryid, userid} = ctx.query
  let result = await courseModule.getRankByCategoryId([categoryid,userid])
  console.log('result==>>', result)
  ctx.body = {
    code: 200,
    data: {
      list: result
    },
    msg: "操作成功"
  };
})

// 上一关提交后下一关状态变更
/**
 * @description: 保存当前用户作品及进度
 * @param {type} 
 * @return: 
 */
router.post('/saveWorkByImg', async ctx => { // title description  workImg userid courseid categoryid workid
  let {title, description, workImg, userid, courseid, categoryid, workid} = ctx.request.body
  let publishTime = new Date()
  let result = await courseModule.saveWorkByImg([title, description, workImg, userid, courseid, categoryid, publishTime, workid])
  console.log('getOpenRankByCategoryId==>>', result)
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
 * @description: 获取作品列表
 * @param {type} 
 * @return: 
 */

router.get('/getWorksList', async ctx => {
  let {type} = ctx.query  // type = 1 为最新  type = 2  为点赞最多
  let result = await courseModule.getWorksList(type)
  console.log('getOpenRankByCategoryId==>>', result)
  ctx.body = {
    code: 200,
    data: {
      list: result
    },
    msg: "操作成功"
  };
})

/**
 * @description: 获取当前类目下的所有课程
 * @param {type} 
 * @return: 
 */
router.get('/getAllCourseByCategoryId', async ctx => { // 
  let {id} = ctx.query
  let result = await courseModule.getAllCourseByCategoryId(id)
  console.log('getOpenRankByCategoryId==>>', result)
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
 * @description: 获取当前类目下的当前课程详情
 * @param {type} 
 * @return: 
 */
router.get('/getAllCourseDetailByCategoryId', async ctx => { // 
  let {categoryid,courseid} = ctx.query
  let result = await courseModule.getAllCourseDetailByCategoryId([categoryid,courseid])
  console.log('getOpenRankByCategoryId==>>', result)
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
 * @description: 修改、新增当前类目下的当前课程
 * @param {type} 
 * @return: 
 */
router.post('/saveCourseDetailByCategoryId', async ctx => { // 
  let {categoryid,courseid,title,courseDesc,coverImg,viewcount,workName,workDesc,workImg,courseUrl,sort,zhuanfang} = ctx.request.body
  let isHasSortCourse = await courseModule.isHasSortCourse([categoryid, sort])
  if (isHasSortCourse.length!== 0) {
    return  ctx.body = {
              code: 500,
              msg: "当前课程次序有误，请重新输入"
            };
  }
  let result = await courseModule.saveCourseDetailByCategoryId([title,courseDesc,coverImg,viewcount,workName,workDesc,workImg,courseUrl,sort,zhuanfang,categoryid,courseid])
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据或信息输入有误"
            };
  }
  ctx.body = {
    code: 200,
    data: null,
    msg: "操作成功"
  };
})

module.exports = router

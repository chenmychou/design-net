const config = require('../../../config')
const queryModule = require('../../module/queryModule')
const router = require('koa-router')({prefix: config.preFix})
const checkToken = require('../../middleware/checkAuth');

router.get('/', ctx => {
  ctx.body = '这是服务器首页';
})

// 删除数据
router.get('/deleteWorks', checkToken, async ctx => {
  let id = ctx.query.id;
  let result = await queryModule.deteleWorks(id)
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    msg: "删除成功"
  };
})
// 删除全部数据
router.get('/deleteAllWorks',checkToken, async ctx => {
  let result = await queryModule.deteleAllWorks()
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "无此数据"
            };
  }
  ctx.body = {
    code: 200,
    msg: "所有数据删除成功"
  };
})
// 插入单条数据
router.post('/addWorks',checkToken, async ctx => {
  let {title, description,  link,  hours, startTime, endTime,activityStatus,tagName,tagImg,userId, type, videoUrl} = ctx.request.body
  let result = await queryModule.insertWorks([title, description, link, hours, startTime, endTime,activityStatus,tagName,tagImg,userId, type, videoUrl])
  console.log('result', result)
  ctx.body = {
    code: 200,
    msg: `插入成功!`
  }
})
// 修改数据

router.post('/updateWorks',checkToken, async ctx => {
  let {title, description,  hours, link, startTime, endTime,activityStatus,tagName,tagImg,userId,type, id,videoUrl} = ctx.request.body
  let result = await queryModule.updateWorks([title, description, link, hours, startTime, endTime,activityStatus,tagName,tagImg,userId,type,videoUrl,id])
  console.log('result', result)
  ctx.body = {
    code: 200,
    msg: `修改成功`
  };
})
// 查找数据
router.get('/findWorks',checkToken, async ctx => {
  let id = ctx.query.id;
  let result = await queryModule.findWorks(id)
  ctx.body = {
    code: 200,
    data: result,
    msg: '操作成功'
  }
})
// 查找所有数据

router.get('/findAllWorks',checkToken, async ctx => {
  let type = ctx.query.type; // 区分今天，明天  1，2
  let search = ctx.query.search; // 搜索
  let result = await queryModule.findAllWorks({type, search})
  ctx.body = {
    code: 200,
    data: result,
    msg: '操作成功'
  }
})
module.exports = router

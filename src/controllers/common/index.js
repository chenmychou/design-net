/*
 * @Author: chenmy
 * @Date: 2020-06-07 08:40:19
 * @LastEditTime: 2020-08-07 19:36:54
 * @LastEditors: Please set LastEditors
 * @Description: 评论接口
 * @FilePath: /design-net/src/controllers/commet/index.js
 */ 
const config = require('../../../config')
const queryModule = require('../../module/queryModule')
const router = require('koa-router')({prefix: config.preFix})
const checkToken = require('../../middleware/checkAuth'); // 需要鉴权就加在路由里面

// router.get('/', ctx => {
//   ctx.body = '这是服务器首页';
// })
/**
 * @description: 搜索接口
 * @param {type} 
 * @return: 
 */
router.post('/searchCourse', async ctx => {
  let { searchContent } = ctx.request.body
  let result = await queryModule.searchCourse(searchContent)
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
// getNewsList,
//   getNewsDetail,
//   saveNewsDetail,
/**
 * @description: 资讯列表
 * @param {type} 
 * @return: 
 */
router.get('/getNewsList', async ctx => {
  // let { searchContent } = ctx.request.body
  let result = await queryModule.getNewsList()
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
 * @description: 资讯详情
 * @param {type} 
 * @return: 
 */
router.get('/getNewsDetail', async ctx => {
  let { id } = ctx.query
  let result = await queryModule.getNewsDetail(id)
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
 * @description: 保存或增加资讯
 * @param {type} 
 * @return: 
 */
// newsTitle  newDesc newsid newsImgs
router.post('/saveNewsDetail', async ctx => {
  let { newsTitle, newDesc,newsImgs, id } = ctx.request.body
  let result = await queryModule.saveNewsDetail([newsTitle,newDesc,newsImgs,id])
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
 * @description: 获取广告图片
 * @param {type} 
 * @return: 
 */
router.get('/getAdBrand', async ctx => {
  let result = await queryModule.findAllAd()
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
 * @description: 保存或增加广告图片
 * @param {type} 
 * @return: 
 */
router.post('/saveAdBrand',checkToken, async ctx => {
  let {id, adimg, adlink} = ctx.request.body
  let result = await queryModule.saveAdBrand([adimg, adlink, id])
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
// 删除全部数据
/**
 * @description: 删除某条广告
 * @param {type} 
 * @return: 
 */
router.get('/deteleAdBrand',checkToken, async ctx => {
  let id = ctx.query.id;
  let result = await queryModule.deteleAdBrand(id)
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


/**
 * @description: 获取l轮播图片
 * @param {type} 
 * @return: 
 */
router.get('/getbannerBrand', async ctx => {
  let result = await queryModule.getbannerBrand()
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
 * @description: 保存或增加某条轮播
 * @param {type} 
 * @return: 
 */
router.post('/saveBannerBrand',checkToken, async ctx => {
  let {id, bannerImg, bannerUrl, title} = ctx.request.body
  let result = await queryModule.saveBannerBrand([bannerImg, bannerUrl,title,id])
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
 * @description: 删除某条轮播
 * @param {type} 
 * @return: 
 */
router.get('/deteleBannerBrand',checkToken, async ctx => {
  let id = ctx.query.id;
  let result = await queryModule.deteleBannerBrand(id)
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

module.exports = router

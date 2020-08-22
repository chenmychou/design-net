/*
 * @Author: chenmy
 * @Date: 2020-06-07 08:40:19
 * @LastEditTime: 2020-08-22 11:39:21
 * @Description: 评论接口
 * @FilePath: /design-net/src/controllers/commet/index.js
 */ 
const config = require('../../../config')
const queryModule = require('../../module/queryModule')
const router = require('koa-router')({prefix: config.preFix})
const checkToken = require('../../middleware/checkAuth'); // 需要鉴权就加在路由里面
const loginModule = require('../../module/loginModule');
function formatArray(data) {
  let result = {}
  let key = 'list'
  // let key1 = 'list'
  let relation='replyid'
  let ParentId='commetid'
  function collapseArray(arr) {
    arr.filter((o, i) => {
        if(!o[relation]){
            if (result['list'] && result['list'][0]) {
            } else {
                result['list'] = []
            }
            result['list'].push(o)
        }else{
            if(result['list']&&result['list'][0]){
              console.log('result.children==>', o)
              associativeArray(result['list'],o)
            }
        }
    })
  }   
  function associativeArray(result,o) {
    for(let k in result){
        if(result[k][ParentId]==o[relation]){
            if(result[k].children&&result[k].children[0]){
                result[k].children.push(o)
            }else{
                result[k].children=[]
                result[k].children.push(o)
            }
            // break
        }else{
            if(result[k].children&&result[k].children[0]){
              associativeArray(result[k].children,o)
            }
        }
    }
  }
  collapseArray(data)
  return result
}
// router.get('/', ctx => {
//   ctx.body = '这是服务器首页';
// })
/**
 * @description: 获取当前作品下所有评论
 * @param {type} 
 * @return: 
 */
router.get('/getAllCommentByWorkId', async ctx => {
  let id = ctx.query.id;
  let datalist = await queryModule.getAllCommet(id)
  let obj = formatArray(datalist)
  ctx.body = {
    code: 200,
    data:obj,
    msg: "操作成功"
  };
})
/**
 * @description: 获取当前作品下所有评论
 * @param {type} 
 * @return: 
 */
router.post('/saveCommet', checkToken, async ctx => {
  const token = ctx.get('token')
  let checkTokenUser = await loginModule.getUserInfoByToken(token)
  let {workid,content,to_userid, commetid, likenum, replyid} = ctx.request.body
  console.log('ctx.request.body', ctx.request.body, checkTokenUser[0].from_userid)
  let result = await queryModule.saveCommet([checkTokenUser[0].from_userid,to_userid,replyid,content,likenum,workid,commetid])
  console.log('resultresult',result )
  if (result.affectedRows === 0) {
    return  ctx.body = {
              code: 500,
              msg: "评论失败"
            };
  }
  ctx.body = {
    code: 200,
    data: null,
    msg: "操作成功"
  };
})
module.exports = router

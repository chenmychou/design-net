const config = require('../../../config')
const loginModule = require('../../module/loginModule')
const router = require('koa-router')({prefix: config.preFix})
const createToken = require('../../middleware/createToken');
const checkToken = require('../../middleware/checkAuth');
const saveToken = (val) => { // 查找所有类目
  let _sql = `update user_tab set token="${val[0]}" where id=${val[1]};`
  return query(_sql)
}
/**
 * @description: 登录  /login   post
 * @param {userName,passWord} 
 * @return: 
 */
router.post('/login', async ctx => {
  // 登录
  let user = {
    userName: ctx.request.body.userName,
    passWord: ctx.request.body.passWord
  }
  console.log('loginloginloginlogin==>>', user)
  await loginModule.findUser([user.userName, user.passWord]).then((res) => {
    if (!res.length) {
      ctx.body = {
        code: 500,
        msg: '用户名或者密码错误!',
      }
    } else {
      console.log('res===>', res[0])
      // if (res[0].password === user.passWord) {
        let token = createToken(res[0])
        ctx.body = {
          code: 200,
          msg: '登录成功!',
          userInfo: {
            ...res[0]
          },
          token
        }
        console.log('密码校验正确, 允许登录')
      // } else {
      //   ctx.body = {
      //     code: 500,
      //     msg: '用户名或者密码错误!',
      //   }
      //   console.log('用户名或者密码错误')
      // }
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      msg: err,
    }
  })
})
/**
 * @description: 注册 /register  post
 * @param {userName,passWord,emailUrl,verifycode} 
 * @return: 
 */
router.post('/register', async ctx => {
  // 注册
  let user = {
    userName: ctx.request.body.userName,
    passWord: ctx.request.body.passWord,
    emailUrl: ctx.request.body.emailUrl,
    verifycode: ctx.request.body.verifycode
  }
  console.log('loginloginloginlogin==>>', user)
  if (!user.userName ||!user.passWord || !user.emailUrl || !user.verifycode ) {
    return ctx.body = {
      code: 500,
      msg: '注册信息有误或不完整'
    }
  }
  if (user.userName&&user.userName.length < 3) {
    return ctx.body = {
      code: 500,
      msg: '用户名要求至少3个字符'
    }
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(user.passWord)) {
    // 至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
    return ctx.body = {
      code: 500,
      msg: '密码要求至少8-16个字符，至少1个大写字母，1个小写字母和1个数字'
    }
  }
  let checkUserInfo = await loginModule.findUser(user.userName)
  console.log('checkUserInfo===>', checkUserInfo[0]&&checkUserInfo[0].codeTime)
  if (checkUserInfo.length > 0) {
    return ctx.body = {
      code: 500,
      msg: '用户名已存在'
    }
  }
  let checkEmail = await loginModule.findEmail(user.emailUrl)
  // console.log('checkEmail===>', checkEmail[0].useName)
  if (checkEmail.length > 0 && checkEmail[0].useName) {
    return ctx.body = {
      code: 500,
      msg: '邮箱已注册'
    }
  }
  let checkVerifycode = await loginModule.findVerifycode([user.emailUrl])
  console.log('checkVerifycode===>', checkVerifycode, new Date(checkVerifycode[0].codeTime).getTime())
  if (checkVerifycode.length === 0) {
    return ctx.body = {
      code: 500,
      msg: '请获取邮箱验证码'
    }
  } else if (checkVerifycode[0].verifycode !== user.verifycode) {
      return ctx.body = {
        code: 500,
        msg: '验证码错误'
      }
  } else if (new Date().getTime() - new Date(checkVerifycode[0].codeTime).getTime() > 10 * 60 * 1000) {
    return ctx.body = {
      code: 500,
      msg: '验证码已失效，请重新获取'
    }
  }
  console.log('checkVerifycode==>', checkVerifycode)
  let insertData = await loginModule.updateUserInfo([user.userName, user.passWord, user.emailUrl])
  console.log('insertData===>', insertData)
  if (insertData.affectedRows > 0) {
    return ctx.body = {
      code: 200,
      data: null,
      msg: '注册成功'
    }
  } else {
    return ctx.body = {
      code: 500,
      msg: '注册失败，请重试'
    }
  }
  
})
// // 查找所有管理用户数据
// router.get('/getAdminList',checkToken, async ctx => {
//   let result = await loginModule.findAllUser()
//   let list = []
//   result.forEach(item => {
//     var obj = {}
//     obj.id = item.id
//     obj.usename = item.usename
//     obj.headImg = item.headImg
//     list.push(obj)
//   })
//   ctx.body = {
//     code: 200,
//     data: list,
//     msg: '操作成功'
//   }
// })
// router.get('/deleteAdmin', checkToken, async ctx => {
//   let id = ctx.query.id;
//   if (id == 1) {
//     return  ctx.body = {
//       code: 500,
//       msg: "超级管理员不可删除"
//     };
//   }
//   let result = await loginModule.deteleAdmin(id)
//   if (result.affectedRows === 0) {
//     return  ctx.body = {
//               code: 200,
//               msg: "无此数据"
//             };
//   }
//   ctx.body = {
//     code: 200,
//     msg: "删除成功"
//   };
// })
// // 新增管理员
// router.post('/addAdmin',checkToken, async ctx => {
//  let {userName, passWord} = ctx.request.body
// //  console.log('addTagaddTagaddTagaddTagaddTag', ctx.request.body)
//   if(!userName || !passWord) {
//     return ctx.body = {
//       code: 500,
//       data: null,
//       msg: '用户名和密码不能为空'
//     }
//   }
//   let checkUserName = await loginModule.findUser(userName)
//   if (checkUserName.length > 0) {
//     return ctx.body = {
//       code: 500,
//       data: null,
//       msg: '用户名重复'
//     }
//   }
//   let result = await loginModule.insertAdmin([userName, passWord])
//   ctx.body = {
//     code: 200,
//     data: null,
//     msg: '添加成功'
//   }
// })
// // 修改管理员
// router.post('/updateAdmin',checkToken, async ctx => {
//   let {userName, passWord, id} = ctx.request.body
//   if(!userName || !passWord) {
//     return ctx.body = {
//       code: 500,
//       data: null,
//       msg: '用户名和密码不能为空'
//     }
//   }
//   if(userName !== 'admin') {
//     return ctx.body = {
//       code: 500,
//       data: null,
//       msg: '超级管理员不可修改用户名'
//     }
//   }
//    let result = await loginModule.updateAdmin([userName, passWord, id])
//    ctx.body = {
//      code: 200,
//      data: null,
//      msg: '修改成功'
//    }
//  })
module.exports = router

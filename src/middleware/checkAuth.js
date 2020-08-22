/*
 * @Author: your name
 * @Date: 2020-06-05 19:31:36
 * @LastEditTime: 2020-08-07 20:20:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /design-net/src/middleware/checkAuth.js
 */ 

const jwt = require('jsonwebtoken');
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'design',(err, decorded) => {
            console.log('decordeddecordeddecorded', err, decorded)
            if(err) return reject(err)
            resolve(decorded)
        }); 
    })
}
// 必须要有Token (需要用户登录)
module.exports = async ( ctx, next ) => {
    const token = ctx.get('token'); // request 带过来的 token
    if (token == '') {
        ctx.body = {
            code: 401,
            msg: '用户未登录'
        }
        return false
    }
    try {
        await verifyToken(token)
    } catch (error) {
        console.log('erroerrorerrorerrorerrorr', error)
        if (error) return ctx.body = {
            code: 401,
            msg: '用户登录已失效'
        }
    }
    await next()
}
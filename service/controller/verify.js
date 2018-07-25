// const express = require('express')
// const app = express()
const jwt = require('jsonwebtoken')
const config = require('./../config')


module.exports = function (req, res) {
  console.log('这里是verify')

  console.log('cookies:', req.cookies)
  const token = req.cookies.token

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decode) => {
      if (err) {
        res.json({
          msg: '无效的token'
        })
        
      } else {
        console.log('token验证通过')
        res.send({
          msg: 'token验证通过'
        })
      }
    })
  } else {
    res.json({
      msg: '请登录'
    })
  }
}

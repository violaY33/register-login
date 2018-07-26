const jwt = require('jsonwebtoken')
const config = require('./../config')


module.exports = function (req, res) {
  const token = req.cookies.token
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decode) => {
      if (err) {
        res.json({
          status: '500',
          isAccessAllowed: false,
          msg: '服务器内部错误😱'
        })
      } else {
        res.json({
          status: '200',
          isAccessAllowed: true,
          msg: 'token验证通过😘'
        })
      }
    })
  } else {
    res.json({
      status: '200',
      isAccessAllowed: false,
      msg: '无权限，请登录😊'
    })
  }
}

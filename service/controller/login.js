const User = require('./../database/schema/user')
const jwt = require('jsonwebtoken')
const config = require('./../config')

module.exports = function (req, res, next) {
  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err
    if (!user) {
      res.json({
        status: '200',
        valid: false,
        msg: '该用户名不存在'
      })
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          res.json({
            status: '500',
            valid: false,
            msg: '服务器内部错误😱'
          })
        } else {
          if (isMatch) {
            const token = jwt.sign({
              username: user.username
            }, config.jwtSecret, {
              expiresIn: 60 * 60 * 24
            })
            res.cookie('token', token, {
              expires: new Date(Date.now() + 900000)
            });
            res.json({
              status: '200',
              valid: true,
              msg: '登录成功😘'
            })
          } else {
            res.json({
              status: '200',
              valid: false,
              msg: '密码错误😭'
            })
          }
        }
      })
    }
  })
}

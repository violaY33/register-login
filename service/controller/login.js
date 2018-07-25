const User = require('./../database/schema/user')
const jwt = require('jsonwebtoken')
const config = require('./../config')

module.exports = function (req, res, next) {
  console.log(req.body)
  const newUser = new User(req.body)

  //   newUser.save().then(() => {
  //     console.log('注册成功')
  //   })

  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err
    if (!user) {
      console.log('用户不存在')
      res.send('用户不存在')
    } else {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) throw err

        console.log('密码匹配：', isMatch)
        const token = jwt.sign({
          username: user.username
        }, config.jwtSecret, {
          expiresIn: 60 * 60 * 24
        })
        console.log(token)
        res.cookie('token', token, {
          expires: new Date(Date.now() + 900000)
        });

        res.json({
          token: token
        })
      })
    }
  })

  //   res.json(req.body)
  console.log('正在登录验证')
}

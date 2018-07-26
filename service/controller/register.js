const User = require('./../database/schema/user')

module.exports = function (req, res, next) {
  console.log(req.body)
  const newUser = new User(req.body)

  User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (!user) {
      newUser.save().then(() => {
        res.json({
          status: '200',
          isSuccess: true,
          msg: '注册成功😘'
        })
      }).catch(err => {
        res.json({
          status: '500',
          isSuccess: false,
          msg: '服务器内部错误😱'
        })
      })
    } else {
      res.json({
        status: '200',
        isSuccess: false,
        msg: '用户名已存在😖'
      })
    }
  })
}

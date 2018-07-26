const User = require('./../database/schema/user')

module.exports = function (req, res) {
  User.update({
    username: 'test1'
  }, {
    password: '112233'
  }, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json({
        status: '200',
        isSuccess: true,
        msg: '修改成功'
      })
    }
  })
}

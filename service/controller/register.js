
const User = require('./../database/schema/user')

module.exports = function (req, res, next) {  
    console.log(req.body)
    const newUser = new User(req.body)

    newUser.save().then(() => {
        console.log('注册成功')
    })

    res.json(req.body)
}
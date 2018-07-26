module.exports = function (req, res) {
    res.clearCookie('token')
    res.json({
        status: '200',
        isSuccess: true,
        msg: '成功登出😘'
    })
}

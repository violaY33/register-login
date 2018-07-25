const mongoose = require('mongoose')
const glob = require('glob')
const {
  resolve
} = require('path')
const config = require('./../config')

module.exports = {
  initSchemas: function initSchemas() {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)

    console.log('导入schema')
  },
  connect: function connect() {
    //连接数据库
    mongoose.connect(config.database, {
      useNewUrlParser: true
    })

    let maxConnectTimes = 0

    return new Promise((resolve, reject) => {
      //把所有连接放到这里

      //增加数据库监听事件
      mongoose.connection.on('disconnected', () => {
        console.log('***********数据库断开***********')
        if (maxConnectTimes < 3) {
          maxConnectTimes++
          mongoose.connect(db)
        } else {
          reject()
          throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
        }

      })

      mongoose.connection.on('error', err => {
        console.log('***********数据库错误***********')
        if (maxConnectTimes < 3) {
          maxConnectTimes++
          mongoose.connect(db)
        } else {
          reject(err)
          throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
        }

      })
      //链接打开的时
      mongoose.connection.once('open', () => {
        console.log('MongoDB connected successfully 💗')
        resolve()
      })

    })
  }
}

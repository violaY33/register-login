const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const dbInit = require('./database/init')
const config = require('./config')


const app = express()

const register = require('./controller/register')
const login = require('./controller/login')
const verify = require('./controller/verify')


app.use(cors({
    credentials: true,
    origin: true
}))

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.use(cookieParser())

app.set('superSecret', config.jwtsecret);


dbInit.connect()



app.get('/', (req, res, next) => {
  res.send('🎏connecting')
})

app.post('/register', register)
app.post('/login', login)
app.get('/verify', verify)

// app.get('/token', (req, res) => {
//     const token = req.body.token || req.query.token || req.headers['x-access-token'];
//     console.log(token)
//     res.send('正在获取token')
// })











app.listen(9999)
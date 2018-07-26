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
const logout = require('./controller/logout')
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
app.get('/logout', logout)
app.get('/verify', verify)












app.listen(9999)
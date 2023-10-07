const env = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('./middlewares/cors')
const loger = require('./utils/loger')
const { login, createUser, logout } = require('./controllers/users')
const auth = require('./middlewares/auth')
const errors = require('./errors/errors')
const { requestLogger, errorLogger } = require('./middlewares/logger')
const DefaultError = require('./errors/default-error')

const PORT = process.env.PORT || 3000
const BD_URL = process.env.DB_URL || 'mongodb://localhost:27017/mestodb'

mongoose.connect(BD_URL, { useNewUrlParser: true })
mongoose.connection.on('connected', () => console.log('MongoDB is connected to the server.'))
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err))

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors)
app.use(loger)
app.use(requestLogger)

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0)
})

app.post('/signin', login)
app.post('/signup', createUser)

app.use(auth)

app.use('/users', require('./routes/users'))
app.use('/cards', require('./routes/cards'))

app.use('/logout', logout)

app.use((req, res, next) => {
  throw new DefaultError('Карточка или пользователь не найдены, или был запрошен несуществующий роут.', 404)
})

app.use(errorLogger)

app.use(errors)

app.listen(PORT, () => console.log('Server listening on port:', PORT))

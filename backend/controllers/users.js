const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../models/user')
const LostUserError = require('../errors/lost-user-error')
const UserDataError = require('../errors/user-data-error')
const UserIdError = require('../errors/users-id-error')

module.exports.getAllUsers = (req, res, next) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err))
}

module.exports.getUserById = (req, res, next) => {
  const userId = req.user._id

  Users.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new UserIdError('Пользователь по указанному _id не найден.', 404))
      }
      return res.send({ data: user })
    })
    .catch((err) => next(err))
}

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar
  } = req.body

  if (!email && !password) {
    return next(new UserDataError('Переданы неправильные почта или пароль.', 400))
  }

  return bcrypt.hash(password, 10)
    .then((hash) => Users.create({
      email,
      password: hash,
      name,
      about,
      avatar
    }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch((err) => next(err))
}

module.exports.updateProfile = (req, res, next) => {
  const { name, about, avatar } = req.body

  Users.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err))
}

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body

  Users.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err))
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!email && !password) {
    return next(new UserDataError('Переданы неправильные почта или пароль.', 400))
  }

  return Users.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: 'Пользователь с указанным логином и паролем не найден.' })
      }

      return bcrypt.compare(password, user.password)
        .then((check) => {
          if (!check) {
            return next(new UserDataError('Переданы неправильные почта или пароль.', 400))
          }
          const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
          )

          return res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true
          })
            .status(200)
            .send({ message: 'Вход выполнен успешно!' })
        })
    })
    .catch((err) => next(err))
}

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.body._id
  console.log(req.body)

  Users.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new LostUserError('Пользователь по указанному _id не найден.', 404))
      }
      return res.status(200).send({ data: user })
    })
    .catch((err) => next(err))
}

module.exports.logout = (req, res, next) => res.clearCookie('token').status(200).send({ message: 'Вы вышли из аккаунта!' })

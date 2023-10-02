// middlewares/cors.js

const Cors = require('cors')

const cors = {
  origin: 'https://ilya-mesto.nomoredomainsrocks.ru/', // разрешенные домены
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // разрешенные методы
  credentials: true
}

module.exports = Cors(cors)

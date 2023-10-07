const Cards = require('../models/card')
const CardIdError = require('../errors/card-id-error')

module.exports.getAllCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err))
}

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body
  const owner = req.user._id

  Cards.create({ name, link, owner })
    .then((card) => res.send({ card }))
    .catch((err) => next(err))
}

module.exports.deleteCardById = (req, res, next) => Cards.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if (!card) {
      return next(new CardIdError('Карточка с указанным _id не найдена.', 404))
    }
    if (req.user._id !== card.owner) {
      return res.status(200).send({ message: 'У вас нет прав для удаления этой карточки.' })
    }
    return res.status(200).send({ card })
  })
  .catch((err) => next(err))

module.exports.addLikeCard = (req, res, next) => Cards.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true }
)
  .then((card) => {
    if (!card) {
      return next(new CardIdError('Карточка с указанным _id не найдена.', 404))
    }
    return res.send({ card })
  })
  .catch((err) => next(err))

module.exports.deleteLikeCard = (req, res, next) => Cards.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
)
  .then((card) => {
    if (!card) {
      return next(new CardIdError('Карточка с указанным _id не найдена.', 404))
    }
    return res.send({ card })
  })
  .catch((err) => next(err))

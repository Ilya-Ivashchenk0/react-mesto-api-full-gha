import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({onClick, card, onCardLike, handleDeleteCardClick}) {
  const handleClick = () => {
    onClick(card)
  }

  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner === currentUser._id
  const isLiked = () => {
    return Array.isArray(card.likes) && card.likes.some(i => i._id === currentUser._id)
  }

  const cardLikeButtonClassName = (
    `element__button ${isLiked() && 'element__button_color_black'} hover-element`
  )

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() { // открываем попап удаления карточки
    handleDeleteCardClick(card._id)
  }

  return (
    <article className="element">
      <img src={ card.link } className="element__mask-img" alt={ card.name } onClick={ handleClick } />
      {isOwn && <button onClick={ handleDeleteClick } className="element__trash hover-element" type="button" id="trash" />}
      <div className="element__group">
        <h2 className="element__title">{ card.name }</h2>
        <div className="element__like-area">
          <button onClick={ handleLikeClick } className={ cardLikeButtonClassName } type="button" id="like"></button>
          <p className="element__likes-lenth">{ card.likes?.length || 0 }</p>
        </div>
      </div>
    </article>
  )
}

export default Card

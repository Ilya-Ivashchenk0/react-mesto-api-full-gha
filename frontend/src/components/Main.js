import React from 'react'
import Card from "./Card"
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({
  cards,
  onCardClick,
  onCardLike,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleEditAvatarClick,
  handleDeleteCardClick
  }) {
    const currentUser = React.useContext(CurrentUserContext)
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img src={ currentUser.avatar } alt="Аватар пользователя" className="profile__avatar" />
          <button onClick={ handleEditAvatarClick } className="profile__avatar-button"></button>
        </div>
        <div className="profile__prfile-info">
          <h1 className="profile__title">{ currentUser.name }</h1>
          <button onClick={ handleEditProfileClick } type="button" className="profile__edit-button hover-element" aria-label="Edit" id="open_edit_popup_button"></button>
          <p className="profile__subtitle">{ currentUser.about }</p>
        </div>
        <button onClick={ handleAddPlaceClick } type="button" className="profile__add-button hover-element" id="button_open_popup_card"></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onClick={onCardClick}
            handleDeleteCardClick={handleDeleteCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
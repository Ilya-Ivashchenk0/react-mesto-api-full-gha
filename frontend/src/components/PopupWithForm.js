import React from 'react'

function PopupWithForm({ isOpen, onClose, onSubmit, title, children }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close-button"></button>
        <form onSubmit={onSubmit} className="popup__form" noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm
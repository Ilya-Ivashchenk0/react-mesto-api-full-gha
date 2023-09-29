import React, { useState, useEffect } from "react"
import { validateAvatar } from '../utils/validation'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatar = React.useRef()
  const [avatarError, setAvatarError] = useState('')

  function handleChange(e) {
    setAvatarError(validateAvatar(e.target.value))
  }

  function handleSubmit(e) {
    e.preventDefault() // Запрещаем браузеру переходить по адресу формы

    onUpdateAvatar(avatar.current.value)
  }

  useEffect(() => {
    avatar.current.value = ''
    setAvatarError('')
  }, [isOpen])

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title={'Обновить аватар'}>
      <input ref={avatar} onChange={handleChange} type="url" name="url" className="popup__input popup__input_field_url" placeholder="Ссылка на картинку" required />
      <span className={`popup__error ${avatarError ? 'popup__error_visible' : ''}`} id="avatar-error">{avatarError}</span>
      <button
        type="submit"
        className={`popup__save-button hover-element ${(!avatar.current || avatar.current.value === '' || avatarError !== '') ? 'popup__save-button_disabled' : ''}`}
        id="save"
        disabled={!avatar.current || avatar.current.value === '' || avatarError !== ''}
      >
        Сохранить
      </button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup

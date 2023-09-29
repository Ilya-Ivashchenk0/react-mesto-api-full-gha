import React, { useState, useEffect } from "react"
import { validateTitle, validateUrl } from '../utils/validation'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({onAddCard, isOpen, onClose }) {
  const [title, setTitle] = useState('') // состояние и функция поля имени пользователя
  const [url, setUrl] = useState('') // состояние и функция поля о пользователе
  const [titleError, setTitleError] = useState('') // текст ошибки для поля title
  const [urlError, setUrlError] = useState('') // текст ошибки для поля url

  const isDisabled = !title || titleError || !url || urlError

  function handleChangeTitle(e) {
    setTitle(e.target.value)
    setTitleError(validateTitle(e.target.value))
  }

  function handleChangeUrl(e) {
    setUrl(e.target.value)
    setUrlError(validateUrl(e.target.value))
  }

  function handleSubmit(e) {
    e.preventDefault() // Запрещаем браузеру переходить по адресу формы

    onAddCard({ // передаём значения управляемых компонентов во внешний обработчик
      title,
      url
    })
  }

  useEffect(() => {
    setTitle('')
    setUrl('')
    setTitleError('')
    setUrlError('')
  }, [isOpen])

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title={'Новое место'}>
      <input onChange={handleChangeTitle} value={title} type="text" name="name" className="popup__input popup__input_field_designation" placeholder="Название" minLength="2" maxLength="30" required />
      <span className={`popup__error ${titleError ? 'popup__error_visible' : ''}`} id="name-error">{titleError}</span>
      <input onChange={handleChangeUrl} value={url} type="url" name="url" className="popup__input popup__input_field_url" placeholder="Ссылка на картинку" required />
      <span className={`popup__error ${urlError ? 'popup__error_visible' : ''}`} id="url-error">{urlError}</span>
      <button
        type="submit"
        className={`popup__save-button hover-element ${isDisabled ? 'popup__save-button_disabled' : ''}`}
        id="save"
        disabled={isDisabled}
      >
        Сохранить
      </button>
    </PopupWithForm>
  )
}

export default AddPlacePopup

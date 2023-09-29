import React, { useState, useEffect } from "react"
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { validateName, validateDescription } from '../utils/validation'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = useState('') // состояние и функция поля имени пользователя
  const [description, setDescription] = useState('') // состояние и функция поля о пользователе
  const [nameError, setNameError] = useState('') // текст ошибки для поля name
  const [descriptionError, setDescriptionError] = useState('') // текст ошибки для поля description

  function handleChangeName(e) {
    setName(e.target.value)
    setNameError(validateName(e.target.value)) // валидация инпута
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
    setDescriptionError(validateDescription(e.target.value)) // валидация инпута
  }

  function handleSubmit(e) {
    e.preventDefault() // pапрещаем браузеру переходить по адресу формы

    onUpdateUser({ // передаём значения управляемых компонентов во внешний обработчик
      name,
      about: description
    })
  }

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
    setNameError('')
    setDescriptionError('')
  }, [currentUser, isOpen])

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title={'Редактировать профиль'}>
      <input value={name} onChange={handleChangeName} type="text" name="username" className="popup__input popup__input_field_name" placeholder="Имя" minLength="2" maxLength="40" required />
      <span className={`popup__error ${nameError ? 'popup__error_visible' : ''}`} id="username-error">{nameError}</span>
      <input value={description} onChange={handleChangeDescription} type="text" name="about" className="popup__input popup__input_field_job" placeholder="О себе" minLength="2" maxLength="200" required />
      <span className={`popup__error ${descriptionError ? 'popup__error_visible' : ''}`} id="about-error">{descriptionError}</span>
      <button
        type="submit"
        className={`popup__save-button hover-element ${(!name || nameError || !description || descriptionError) ? 'popup__save-button_disabled' : ''}`}
        id="save"
        disabled={!name || nameError || !description || descriptionError}
      >
        Сохранить
      </button>
    </PopupWithForm>
  )
}

export default EditProfilePopup

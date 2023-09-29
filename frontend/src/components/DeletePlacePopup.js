import PopupWithForm from './PopupWithForm'

function DeletePlacePopup({onClose, isOpen, onCardDelete, cardDeleteId}) {
  function handleSubmit(e) {
    e.preventDefault() // Запрещаем браузеру переходить по адресу формы
    onCardDelete(cardDeleteId)
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title={'Вы уверены?'}>
      <button
        type="submit"
        className="popup__save-button hover-element"
      >
        Да
      </button>
    </PopupWithForm>
  )
}

export default DeletePlacePopup

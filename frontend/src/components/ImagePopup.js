function ImagePopup({onClose, card}) {
  return (
    <div className={`popup popup_type_img ${card ? 'popup_opened' : ''}`}>
      <div className="popup__img-container">
        <button onClick={ onClose } type="button" className="popup__close-button hover-element" id="button_close_popup_img"></button>
        <img src={ card ? card.link : '#' } alt={ card ? card.name : '' } className="popup__img" />
        <p className="popup__img-title">{ card ? card.name : '' }</p>
      </div>
    </div>
  )
}

export default ImagePopup

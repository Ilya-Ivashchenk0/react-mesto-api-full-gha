import { useNavigate } from 'react-router-dom'
import succes from '../images/success.svg'
import fail from '../images/fail.svg'

function InfoTooltip({isOpen, onClose, successRegister, setTooltipOpen}) {
  const navigate = useNavigate()

  function handleCloseTooltip() {
    if(successRegister) {
      navigate('/')
    } else {
      setTooltipOpen(false)
    }
  }

  return (
    <div className={`popup popup_type_delete ${isOpen ? 'popup_opened' : ''}`}>
      <div onClick={handleCloseTooltip} className="popup__container" id="popup_conteiner">
        <button onClick={onClose} type="button" className="popup__close-button hover-element" id="button_close_popup_profile" />
        <img src={successRegister ? succes : fail} alt="succes" className="popup__img_type_success" />
        <h3 className="popup__title">
          {successRegister
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так!\nПопробуйте ещё раз.'}
        </h3>
      </div>
    </div>
  )
}

export default InfoTooltip

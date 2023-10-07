import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../utils/auth'
import { validateEmail, validatePassword } from '../utils/validation'
import InfoTooltip from './InfoTooltip'

function Login({setEmailUser, handleLoggedInTrue}) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isTooltipOpen, setTooltipOpen] = useState(false)
  const [successRegister, setSuccessRegister] = useState(false)

  function handleChangeEmail(e) {
    setEmail(e.target.value)
    setEmailError(validateEmail(e.target.value)) // валидация инпута
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
    setPasswordError(validatePassword(e.target.value)) // валидация инпута
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    login(email, password)
      .then((res) => {
        setSuccessRegister(true)
        setTooltipOpen(true)
        setEmailUser(email)
        handleLoggedInTrue()
        navigate('/')
        setEmailError('')
        setPasswordError('')
      })
      .catch((err) => {
        setTooltipOpen(true)
        setSuccessRegister(false)
        console.log(err)
      })
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Вход</h3>
      <form onSubmit={handleSubmit} name='login' className={`auth__form`} noValidate>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          className="auth__input"
          autoComplete="username"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
        />
        <span className={`popup__error ${emailError ? 'popup__error_visible' : ''}`} id="username-error">{emailError}</span>
        <input
          value={password}
          onChange={handleChangePassword}
          type="password"
          autoComplete="current-password"
          name="about"
          className="auth__input"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
        />
        <span className={`popup__error ${passwordError ? 'popup__error_visible' : ''}`} id="about-error">{passwordError}</span>
        <button
          type="submit"
          className={`auth__button auth__button_type_login ${(!email || emailError || !password || passwordError) ? 'popup__save-button_disabled' : ''}`}
          id="save"
          disabled={!email || emailError || !password || passwordError}
        >
          Войти
        </button>
      </form>
      <InfoTooltip isOpen={isTooltipOpen} successRegister={successRegister} setTooltipOpen={setTooltipOpen} />
    </div>
  )
}

export default Login

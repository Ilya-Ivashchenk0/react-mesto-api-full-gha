import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { register } from '../utils/auth'
import InfoTooltip from './InfoTooltip'
import { validateEmail, validatePassword } from '../utils/validation'

function Register() {
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

    register(email, password)
      .then(() => {
        setSuccessRegister(true)
        setTooltipOpen(true)
        setEmailError('')
        setPasswordError('')
      })
      .catch(() => {
        setTooltipOpen(true)
        setSuccessRegister(false)
      })
  }

  return (
    <div className="auth">
      <h3 className="auth__title">Регистрация</h3>
      <form onSubmit={handleSubmit} name='register' className={`auth__form`} noValidate>
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
          className={`auth__button ${(!email || emailError || !password || passwordError) ? 'popup__save-button_disabled' : ''}`}
          id="save"
          disabled={!email || emailError || !password || passwordError}
        >
          Зарегистрироваться
        </button>
      </form>
      <NavLink className="auth__link hover-element" to="/sign-in">Уже зарегистрированы? Войти</NavLink>
      <InfoTooltip isOpen={isTooltipOpen} successRegister={successRegister} setTooltipOpen={setTooltipOpen} />
    </div>
  )
}

export default Register

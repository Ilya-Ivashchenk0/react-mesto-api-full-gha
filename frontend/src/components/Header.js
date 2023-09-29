import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/logo.svg'
import burger from '../images/burger.svg'
import close from '../images/close.svg'
import NavBar from './NavBar'

function Header({handleLoggedInFalse, resetEmail, userEmail}) {
  const navigate = useNavigate()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  function logOut() {
    handleLoggedInFalse()
    localStorage.removeItem('token')
    resetEmail()
    navigate('/sign-in', { replace: true })
  }

  useEffect(() => {
    const handleResize = () => { // обработчик изменения размера окна
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize) // добавляем слушатель события при монтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize) // убираем слушатель события при размонтировании компонента
    }
  }, [])

  return (
    <div>
      {isMenuOpen && windowWidth <= 879 && (
        <NavBar
          isMenuOpen={isMenuOpen}
          userEmail={userEmail}
          logOut={logOut}
        />
      )}
      <header className="header">
        <img src={logo} alt="Логотип" className="header__logo" />
        <div className='header__container'>
          {windowWidth >= 879 && (
            <>
              <p className='header__email'>{userEmail}</p>
              <Routes>
                <Route path="/sign-in" element={<NavLink className='header__navigate hover-element' to="/sign-up">Зарегистрироваться</NavLink>} />
                <Route path="/sign-up" element={<NavLink className='header__navigate hover-element' to="/sign-in">Войти</NavLink>} />
                <Route path="/" element={<p className='header__navigate hover-element' onClick={logOut}>Выйти</p>} />
              </Routes>
            </>
          )}
        </div>
        {windowWidth <= 879 && (
          <button
            onClick={toggleMenu}
            className="header__nav-button hover-element"
            aria-label="Иконка меню"
          >
            <img
              src={isMenuOpen ? close : burger}
              alt={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="header__nav-icon"
            />
          </button>
        )}
      </header>
    </div>
  )
}

export default Header

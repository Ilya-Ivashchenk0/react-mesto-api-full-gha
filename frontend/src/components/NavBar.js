import { Routes, Route, NavLink } from 'react-router-dom'

function NavBar({ userEmail, logOut, isMenuOpen }) {
  return (
    <div className={`${isMenuOpen ? 'header__container_type_mobile' : 'header__container'}`}>
      <p className='header__email'>{userEmail}</p>
      <Routes>
        <Route path="/sign-in" element={<NavLink className='header__navigate hover-element' to="/sign-up">Зарегистрироваться</NavLink>} />
        <Route path="/sign-up" element={<NavLink className='header__navigate hover-element' to="/sign-in">Войти</NavLink>} />
        <Route path="/" element={<p className='header__navigate hover-element' onClick={logOut}>Выйти</p>} />
      </Routes>
    </div>
  )
}

export default NavBar

  import { useState, useEffect } from 'react'
  import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
  import Footer from './Footer'
  import Header from './Header'
  import Main from './Main'
  import ImagePopup from './ImagePopup'
  import EditProfilePopup from './EditProfilePopup'
  import EditAvatarPopup from './EditAvatarPopup'
  import AddPlacePopup from './AddPlacePopup'
  import DeletePlacePopup from './DeletePlacePopup'
  import Login from './Login'
  import Register from './Register'
  import ProtectedRoute from './ProtectedRoute'
  import { authorize } from '../utils/auth'
  import { api } from '../utils/api'
  import { CurrentUserContext } from '../contexts/CurrentUserContext'

  function App() {
    const navigate = useNavigate()
    const location = useLocation()

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false) // состояние и функция попапа профиля
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false) // состояние и функция попапа аватара
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false) // состояние и функция попапа добавления карточки
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false) // состояние и функция попапа удаления карточки
    const [selectedCard, setSelectedCard] = useState(null) // состояние и функция попапа полноразмерной карточки
    const [cards, setCards] = useState([]) // добавляем в стейт карточки
    const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', cohort: '', _id: ''}) // состояние и функция обновления данных пользоватлея
    const [cardDeleteId, setCardDeleteId] = useState('') // в этом стейте храним id для удаления карточки
    const [loggedIn, setLoggedIn] = useState(false) // авторизация
    const [userEmail, setUserEmail] = useState('') // email пользователя

    const handleEditProfileClick = () => { // обработчик открытия попапа профиля
      setEditProfilePopupOpen(true)
    }

    const handleAddPlaceClick = () => { // обработчик открытия попапа карточки
      setAddPlacePopupOpen(true)
    }

    const handleEditAvatarClick = () => { // обработчик открытия попапа аватара
      setEditAvatarPopupOpen(true)
    }

    const handleDeleteCardClick = (cardId) => { // обработчик открытия попапа аватара
      setCardDeleteId(cardId)
      setDeletePopupOpen(true)
    }

    const handleCardClick = (card) => {
      setSelectedCard(card)
    }

    const handleLoggedInTrue = () => {
      setLoggedIn(true)
    }

    const handleLoggedInFalse = () => {
      setLoggedIn(false)
    }

    const handleCloseAllPopups = () => { // обработчик закрытия всех попапов
      setEditProfilePopupOpen(false)
      setAddPlacePopupOpen(false)
      setEditAvatarPopupOpen(false)
      setDeletePopupOpen(false)
      setSelectedCard(null)
    }

    const setEmailUser = (email) => {
      setUserEmail(email)
    }

    const resetEmail = () => {
      setUserEmail('')
    }

    function handleCardLike(card) { // лайк карточек
      const isLiked = card.likes.some(i => i._id === currentUser._id) // Снова проверяем, есть ли уже лайк на этой карточке
      api.changeLikeCardStatus(card._id, !isLiked) // Отправляем запрос в API и получаем обновлённые данные карточки
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleCardDelete(cardId) { // удаление карточек
      api.deleteCard(cardId)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== cardId)) // фильтруем стейт карточек и удаляем из него карточку с совпадающим id
          setCardDeleteId(null) // сбрасываем id из стейта удаляемой карточки
          handleCloseAllPopups()
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleUpdateUser({name, about}) { // обновление данных пользователя
      api.setUserInfo({name, about})
        .then((data) => {
          setCurrentUser(data)
          handleCloseAllPopups()
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleUpdateAvatar(avatar) { // обновление аватара пользователя
      api.setUserAvatar(avatar)
        .then((data) => {
          setCurrentUser(state => ({
            ...state,
            avatar: data.avatar
          }))
          handleCloseAllPopups()
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }

    function handleAddPlaceSubmit({title, url}) { // добавление новой карточки
      api.addNewCard({title, url})
        .then((newCard) => {
          setCards([newCard, ...cards])
          handleCloseAllPopups()
        })
        .catch(err => console.log(`Ошибка: ${err}`))
    }

    useEffect(() => { // проверка токена при загрузке страницы
      const checkToken = () => { // если у пользователя есть токен в localStorage, эта функция проверит, действующий он или нет
        const jwt = localStorage.getItem('token')
        if (jwt){
          authorize(jwt)
            .then((res) => {
              setLoggedIn(true)
              navigate('/')
              setUserEmail(res.data.email)
            })
            .catch(err => console.log(`Ошибка: ${err}`))
        }
      }
      checkToken()
    }, [navigate])

    useEffect(() => { // редирект на страницу входа для незалогиненных пользователей по любому маршруту
      if (!loggedIn && location.pathname !== '/sign-up') {
        navigate('/sign-in')
      }
    }, [loggedIn, location.pathname, navigate])

    useEffect(() => {
      if (loggedIn) {
        api.getUserInfo() // загрузка данных пользователя
        .then((data) => {
          setCurrentUser(data)
        })
        .catch(err => console.log(`Ошибка: ${err}`))
      }
    }, [loggedIn])

    useEffect(() => {
      if (loggedIn) {
        api.getInitialCards() // загрузка карточек
          .then(cards => setCards(cards))
          .catch(err => console.log(`Ошибка: ${err}`))
      }
    }, [loggedIn])

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
          <div className="page">
            <Header userEmail={userEmail} resetEmail={resetEmail} handleLoggedInFalse={handleLoggedInFalse} />
            <Routes>
              <Route path="/sign-in" element={<Login handleLoggedInTrue={handleLoggedInTrue} setEmailUser={setEmailUser} />} />
              <Route path="/sign-up" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    element={
                      <>
                        <Main
                          handleEditProfileClick={handleEditProfileClick}
                          handleAddPlaceClick={handleAddPlaceClick}
                          handleEditAvatarClick={handleEditAvatarClick}
                          handleDeleteCardClick={handleDeleteCardClick}
                          onCardClick={handleCardClick}
                          onCardLike={handleCardLike}
                          cards={cards}
                          selectedCard={selectedCard}
                        />
                        <Footer />
                        <EditProfilePopup
                          onUpdateUser={handleUpdateUser}
                          isOpen={isEditProfilePopupOpen}
                          onClose={handleCloseAllPopups}
                        />
                        <EditAvatarPopup
                          onUpdateAvatar={handleUpdateAvatar}
                          isOpen={isEditAvatarPopupOpen}
                          onClose={handleCloseAllPopups}
                        />
                        <AddPlacePopup
                          onAddCard={handleAddPlaceSubmit}
                          isOpen={isAddPlacePopupOpen}
                          onClose={handleCloseAllPopups}
                        />
                        <DeletePlacePopup
                          cardDeleteId={cardDeleteId}
                          onCardDelete={handleCardDelete}
                          isOpen={isDeletePopupOpen}
                          onClose={handleCloseAllPopups}
                        />
                        <ImagePopup
                          card={selectedCard}
                          onClose={handleCloseAllPopups}
                        />
                      </>
                    }
                    loggedIn={loggedIn}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </CurrentUserContext.Provider>
    )
  }

  export default App
const { baseUrl } = require('./checkProd')

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { credentials: 'include', headers: this._headers })
      .then(this._getResponseData)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { method: 'GET', credentials: 'include', headers: this._headers })
      .then(this._getResponseData)
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._getResponseData)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.url,
        likes: []
      })
    })
    .then(this._getResponseData)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, { method: 'DELETE', credentials: 'include', headers: this._headers })
      .then(this._getResponseData)
  }

  addLike(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, { method: 'PUT', credentials: 'include', headers: this._headers })
      .then(this._getResponseData)
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, { method: 'DELETE', credentials: 'include', headers: this._headers })
      .then(this._getResponseData)
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(cardId, like) {
    if (like) {
      return this.addLike(cardId)
    } else {
      return this.deleteLike(cardId)
    }
  }
}

export const api = new Api({
  baseUrl: baseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
})
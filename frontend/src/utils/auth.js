const BASE_URL = 'http://api.ilya-mesto.nomoredomainsrocks.ru'

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json()
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export const authorize = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((res) => {
    return getResponseData(res)
  })
}
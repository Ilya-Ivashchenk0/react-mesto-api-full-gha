const { baseUrl } = require('./checkProd')

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  return res.json()
}

export const register = (email, password) => {
  return fetch(`${baseUrl()}/signup`, {
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
  return fetch(`${baseUrl()}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export const authorize = () => {
  return fetch(`${baseUrl()}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return getResponseData(res)
  })
}

export const logout = () => {
  return fetch(`${baseUrl()}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return getResponseData(res)
  })
}
export function validateName(name) {
  if (!name) {
    return ''
  }
  if (name.length < 2) {
    return 'Имя должно быть не короче 2 символов'
  } else if (name.length > 40) {
    return 'Имя должно быть не длиннее 40 символов'
  } else {
    return ''
  }
}

export function validateDescription(description) {
  if (!description) {
    return ''
  }
  if (description.length < 2) {
    return 'Описание должно быть не короче 2 символов'
  } else if (description.length > 200) {
    return 'Описание должно быть не длиннее 200 символов'
  } else {
    return ''
  }
}

export function validateAvatar(url) {
  if (!url) {
    return ''
  }
  const checkUrl = /^((ftp|http|https):\/\/)?(www.)?([a-z0-9]+[a-z0-9-]*\.)+([a-z]{2,6}\.?)(\/[^\s]*)?$/
  if (!checkUrl.test(url)) {
    return 'Введите корректный URL'
  } else {
    return ''
  }
}

export function validateTitle(title) {
  if (!title) {
    return ''
  }
  if (title.length < 2) {
    return 'Название должно быть не короче 2 символов'
  } else if (title.length > 30) {
    return 'Название должно быть не длиннее 30 символов'
  } else {
    return ''
  }
}

export function validateUrl(url) {
  if (!url) {
    return ''
  }
  const checkUrl = /^((ftp|http|https):\/\/)?(www.)?([a-z0-9]+[a-z0-9-]*\.)+([a-z]{2,6}\.?)(\/[^\s]*)?$/
  if (!checkUrl.test(url)) {
    return 'Введите корректный URL'
  } else {
    return ''
  }
}

export function validateEmail(email) {
  if (!email) {
    return ''
  }
  if (email.length < 2) {
    return 'Email пользователя должно быть не короче 2 символов'
  } else if (email.length > 40) {
    return 'Email пользователя должно быть не длиннее 40 символов'
  } else {
    return ''
  }
}

export function validatePassword(password) {
  if (!password) {
    return ''
  }
  if (password.length < 8) {
    return 'Пароль должен быть не короче 8 символов'
  } else if (password.length > 40) {
    return 'Пароль должен быть не длиннее 40 символов'
  } else {
    return ''
  }
}

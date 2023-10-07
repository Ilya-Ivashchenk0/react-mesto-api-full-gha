function splitData(dataString, maxLength) {
  const result = []
  const lines = dataString.split('\n')

  lines.forEach((line) => {
    let data = line

    while (data.length) {
      const chunk = data.substring(0, maxLength)
      result.push(chunk)
      data = data.substring(maxLength)
    }
  })

  return result
}

module.exports = (req, res, next) => {
  const {
    blue, green, yellow, red, reset, white
  } = {
    reset: '\x1b[0m',
    blue: '\x1b[34m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    white: '\x1b[37m'
  }

  const lineLength = 100

  console.log(`${blue}╭${'─'.repeat(lineLength)}╮${reset}`)

  const queryLog = `Запрос: ${req.method}`
  const timeLog = `Время: ${new Date().toLocaleString()}`

  const maxLengthQuery = 'Запрос: DELETE'.length
  const maxLengthTime = 'Время: 06.10.2023, 05:49:28'.length

  const spaceBetweenLogs = lineLength - maxLengthQuery - maxLengthTime
  const spacesBeforeQuery = Math.floor((maxLengthQuery - queryLog.length) / 2)
  const spacesAfterQuery = maxLengthQuery - spacesBeforeQuery - queryLog.length
  const spacesBeforeTime = Math.floor((maxLengthTime - timeLog.length) / 2)

  console.log(`${blue}│${reset}${' '.repeat(spacesBeforeQuery)}${yellow}${queryLog}${reset}${' '.repeat(spacesAfterQuery + spaceBetweenLogs)}${green}${timeLog}${reset}${blue}│`)

  console.log(`${blue}│${'─'.repeat(lineLength)}│${reset}`)

  const formatBody = (body) => {
    const formattedData = JSON.stringify(body, null, 2)
    return formattedData.split('\n').slice(1, -1).map((line) => `  ${line}`).join('\n')
  }

  const dataLog = req.body && Object.keys(req.body).length
    ? `${red}Data: {\n${formatBody(req.body)}\n}${reset}`
    : `${white}Data none${reset}`

  const maxDataLength = lineLength
  const dataLines = splitData(dataLog, maxDataLength)

  dataLines.forEach((line) => {
    console.log(`  ${line.padEnd(lineLength)}`)
  })

  console.log(`${blue}╰${'─'.repeat(lineLength)}╯${reset}`)

  next()
}

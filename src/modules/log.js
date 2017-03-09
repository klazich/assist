
module.exports = function (dep) {
  let result = {}

  const { console, _ } = dep
  const { red, yellow, gray, white, cyan, reset } = dep.colors

  let firstTime = true

  let tltColor = white
  let msgColor = reset

  result.format = function (title, message) {
    const header = gray('\n        << QI/a\n')

    switch (title) {
      case 'error':
        tltColor = red
        break
      case 'debug':
        tltColor = yellow
        break
      case 'log':
        tltColor = cyan
        break
      default:
        tltColor = gray
      // ...
    }

    if (message) {
      try {
        message = message.replace(/(\n)/g, '$1' + ' '.repeat(11))
      } catch (e) {
        try {
          message = message.stack.replace(/(\n)/g, '$1' + ' '.repeat(11))
        } catch (e) {
          message = JSON.stringify(message, null, 2).replace(/(\n)/g, '$1' + ' '.repeat(11))
        }
      }
    }

    if (title) title = title.trim()

    title = _.padStart(title, 8)

    const prompt = tltColor(title.toUpperCase()) + ' ' + gray('> ')

    let stringOutput = prompt +
      (message
        ? msgColor(message)
        : '')

    if (firstTime) {
      stringOutput = header + stringOutput
      firstTime = false
    }

    return stringOutput
  }

  result.ger = function (title, message) {
    let consoleOutput = result.format(title, message)

    console.log(consoleOutput)
  }
  return result
}

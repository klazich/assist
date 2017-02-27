'use strict'

module.exports = function (dep) {
  let result = {}

  const { console, _ } = dep
  const { red, yellow, gray, white, cyan, reset } = dep.colors

  let firstTime = true

  let tltColor = white,
    msgColor = reset

  result.ger = function (title, message) {
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
      }
      catch (e) {
        message = message.stack.replace(/(\n)/g, '$1' + ' '.repeat(11))
      }
    }
    
    if (firstTime) {
      console.log(gray('        << QI/a '))
      firstTime = false
    }

    title = _.padStart(title, 8)
    const prompt = tltColor(title.toUpperCase()) + ' ' + gray('> ')

    console.log(prompt
      + (message
        ? msgColor(message)
        : ''))
  }

  return result
}
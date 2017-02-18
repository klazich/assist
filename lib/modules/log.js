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

    const prompt = gray('> ')
    title = _.padStart(title, 8)
    if (firstTime){
      console.log(gray('         < QI/a '))
      firstTime = false
    }
    console.log(
      (title
        ? tltColor(title.toUpperCase()) + ' '
        : '') +
      prompt +
      (message
        ? msgColor(message)
        : ''))
  }

  return result
}
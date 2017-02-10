'use strict'

module.exports = function (dep) {
  let result = {}

  const { console } = dep
  const { red, yellow, blue, gray, white, cyan, bold, dim } = dep.colors

  const prompt = bold('QI|a')
  let tltColor = white,
      msgColor = white
  result.log = function (title, message) {
    switch (title) {
      case 'error':
        tltColor = red
        break
      case 'debug':
        tltColor = yellow
        msgColor = gray
        break
      case 'log':
        tltColor = cyan
        msgColor = gray
        break
      default:
      //...
    }

    console.log(prompt +
      (title
        ? tltColor(' ' + title) + ' |'
        : ' |') +
      (message
        ? msgColor(' ' + message)
        : ''))
  }

  result.error = function (title, message) {
    let prompt = `${P} [ERROR]`
    console.log(red(prompt) +
      (title
        ? red(' ' + title)
        : '') +
      (message
        ? gray(' ' + message)
        : ''))
  }
  result.debug = function (title, message) {
    let prompt = `${P} DEBUG >`
    console.log(yellow(prompt) +
      (title
        ? blue(' ' + title)
        : '') +
      (message
        ? gray(' ' + message)
        : ''))
  }
  result.print = function (title, message) {
    let prompt = `[${P}]`
    console.log(blue(prompt) +
      (title
        ? ' ' + title
        : '') +
      (message
        ? gray(' ' + message)
        : ''))
  }
  return result
}
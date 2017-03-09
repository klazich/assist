
module.exports = function (dep) {
  let result = {}

  const { console, _ } = dep


  result.format = function (title, message = '') {

    

    try {
      message = message
        .split('\n')
        .map(s => ' | ' + s)
    } catch (e) {
      message = JSON.stringify(message, null, 2)
      message = message
        .split('\n')
        .map(s => ' | ' + s)
    }
    if (title) message = message.map(s => title.trim().toUpperCase() + s)

    message = message.join('\n')

    return message
  }

  result.ger = function (title, message) {
    let consoleOutput = result.format(title, message)

    console.log(consoleOutput)
  }
  return result
}

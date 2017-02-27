'use strict'

module.exports = function (dep) {
  let result = {}

  // injected dependencies
  let { fs } = dep

  // module code

  result.initPunchDir = (name) => {
    return new Promise((resolve, reject) => {

      // check for top main directory.

    })
  }

  result.punch = (name) => {
    let punch = {
      user: name,
      time: Date.now()
    }

    return new Promise((resolve, reject) => {
      fs.appendFile('clock/.punches', JSON.stringify(punch) + '\n', (err) => {
        if (err) reject(err)
        else resolve(punch)
      })
    })
  }

  return result
}

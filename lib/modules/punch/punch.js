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


  return result
}
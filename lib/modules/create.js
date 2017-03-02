'use strict'

module.exports = function (dep) {
  let result = {}

  const { join, fs } = dep

  result.moduleName = function (moduleName) {

    const folderSrc = join(__dirname, '../scaffolding/create')
    const folderDst = join(process.cwd(), moduleName)

  }

  return result
}
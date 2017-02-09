'use strict'

const shell = require('shelljs')
const { join } = require('path')

exports.command = 'create <moduleName>'
exports.desc = 'Scaffolding command to create a new module'
exports.builder = { }
exports.handler = function (argv) {
  const { moduleName } = argv
  const folderSrc = join(__dirname, '../scaffolding/create')
  const folderDst = join(process.cwd(), moduleName)
  shell.cp('-Rf', folderSrc, folderDst)
}
'use strict'

module.exports = function (dep) {
  let cmd = {}

  cmd.command = ''
  cmd.desc = ''
  cmd.builder = { }
  cmd.handler = function (argv) {
    // ...
  }

  return cmd
}

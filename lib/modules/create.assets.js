'use strict'

module.exports = function (dep) {
  let result = {}

  result.commandFile =
    `'use strict'

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
`
  result.moduleFile =
    `'use strict'

module.exports = function (dep) {
  let result = {}

  return result
}
`
  return result
}

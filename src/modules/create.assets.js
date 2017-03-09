
module.exports = function (dep) {
  let result = {}

  result.commandFile = `
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
  result.moduleFile = `    
module.exports = function (dep) {
  let result = {}

  const { } = dep

  return result
}
`
  return result
}

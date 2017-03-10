const { join, resolve } = require('path')
const camelCase = require('camelcase')
const requireDir = require('require-dir')
const colors = require('chalk')
const shell = require('shelljs')
const fs = require('fs')
const readline = require('readline')
const yargs = require('yargs')
const _ = require('lodash')
const moment = require('moment')
const stripAnsi = require('strip-ansi')

// External dependencies to pass to the commands
let dep = {
  join,
  resolve,
  fs,
  readline,
  console,
  colors,
  shell,
  process,
  yargs,
  _,
  moment,
  stripAnsi
}

// Internal dependencies
const inDepFns = requireDir(join(__dirname, 'src', 'modules'), { recurse: true })
Object.keys(inDepFns).forEach(name => dep[ camelCase(name) ] = inDepFns[ name ](dep))

// Load commands from folder and pass dependencies
const commandsFn = requireDir(join(__dirname, 'src', 'commands'))
const commands = Object.keys(commandsFn).map((i) => commandsFn[ i ](dep))

// Export commands and modules separately
module.exports = { commands, modules: dep }

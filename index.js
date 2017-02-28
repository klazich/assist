'use strict'

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
const inDepFns = requireDir(join(__dirname, 'lib', 'modules'), { recurse: true })
Object.keys(inDepFns).forEach(name => {
  let child = inDepFns[name]
  typeof child === 'function'
    // check one level down if not function.
    ? dep[camelCase(name)] = child(dep)
    : Object.keys(child).forEach(subName => { dep[camelCase(subName)] = child[subName](dep) })
})

// Load commands from folder and pass dependencies
const commandsFn = requireDir(join(__dirname, 'lib', 'commands'))
const commands = Object.keys(commandsFn).map((i) => commandsFn[i](dep))

// Export commands and modules separately
module.exports = { commands, modules: dep }

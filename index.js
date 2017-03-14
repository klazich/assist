require('dotenv').config()

const { join, resolve } = require('path')
const camelCase = require('camelcase')
const requireDir = require('require-dir')
const colors = require('chalk')
const shell = require('shelljs')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const yargs = require('yargs')
const _ = require('lodash')
const moment = require('moment')
const stripAnsi = require('strip-ansi')
const winston = require('winston')
const tabletojson = require('tabletojson')
const json2csv = require('json2csv');

// External dependencies to pass to the commands
let dep = {
  join,
  resolve,
  fs,
  path,
  readline,
  console,
  colors,
  shell,
  process,
  yargs,
  _,
  moment,
  stripAnsi,
  winston,
  tabletojson,
  json2csv,
}

// Internal dependencies
const inDepFns = requireDir(join(__dirname, 'src', 'modules'))
Object.keys(inDepFns).forEach(name => { dep[camelCase(name)] = inDepFns[name](dep) })

// Load commands from folder and pass dependencies
const commandsFn = requireDir(join(__dirname, 'src', 'commands'))
const commands = Object.keys(commandsFn).map((i) => commandsFn[i](dep))

//console.log(Object.keys(dep), dep.root)

// Export commands and modules separately
module.exports = { commands, modules: dep /*, dir: __dirname */ }

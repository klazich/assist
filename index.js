#!/usr/bin/env node
'use strict'

const requireDir        = require('require-dir')
const { join, resolve } = require('path')
const shell             = require('shelljs')
const yargs             = require('yargs')
const colors            = require('chalk')

// External dependencies to pass to the commands
let dep = { join, resolve, console, shell, colors, process }

// Load commands from folder and pass dependencies
const commandsFn = requireDir(join(__dirname, 'lib', 'commands'))
const commands   = Object.keys(commandsFn).map(i => commandsFn[i](dep))

// Init CLI commands and options
commands.forEach(cmd => yargs.command(cmd.command, cmd.desc, cmd.builder, cmd.handler))

// Switch QWD if specified from options
const cwd = resolve(yargs.argv.cwd || process.cwd())
process.chdir(cwd);


yargs
  .help()
  .demand(1)
  .argv
  // .option({ cwd: { desc: 'Change the current working directory' } })
  // .argv


// structure of commands:
//
// 'use strict'
//
// module.exports = function (dep) {
//   let cmd     = {}
//   cmd.command = '...'
//   cmd.desc    = '...'
//   cmd.builder = {}
//   cmd.handler = function (argv) {}
//   return cmd
// }
//
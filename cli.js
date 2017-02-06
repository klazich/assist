#!/usr/bin/env node

require('yargs')
  .commandDir('cmds')
  .demandCommand(1)
  .alias('h', 'help')
  .help()
  .argv;
  
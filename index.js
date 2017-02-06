const yargs = require('yargs');


const argv = yargs
  .commandDir('cmds')
  .demandCommand(1)
  .alias('h', 'help')
  .help()
  .argv;

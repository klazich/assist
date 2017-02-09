const chalk = require('chalk');
const _     = require('lodash');

let  getSampleSize  = require('./aql/aql_assets');


exports.command  = 'aql <level|a> <lot|l>';
exports.describe = 'Get a sample size for a lot size at a AQL level';
exports.builder  = {
  'level': {
    describe: 'Specify AQL level.'
  },
  'lot':   {
    describe: 'Specify lot size.'
  }
};
exports.handler  = (argv) => {

  getSampleSize(argv.level, argv.lot)
    .then((result) => {
      console.log(_.padStart('Lot Size -->', 16),
        chalk.blue(argv.lot), chalk.grey(`(${result.lotRange})`));
      console.log(_.padStart('AQL Level -->', 16),
        chalk.blue(argv.level));
      console.log(_.padStart('Sample Size -->', 16),
        chalk.green(result.sampleSize));
    })
    .catch((err) => {
      console.error(err)
    })
};

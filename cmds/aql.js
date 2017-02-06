let {getSampleSize} = require('./aql/aql_assets')

exports.command = 'aql';
exports.desccribe = 'Get a sampling size for a lot at a AQL level';
exports.builder = {
  level: {
    describe: 'AQL level',
    demand: 'An AQL level is required',
    alias: 'a',
  },
  lot: {
    describe: 'Lot size',
    demand: 'A lot size is required',
    alias: 'l'
  }
};
exports.handler = (argv) => {
  console.log('\nAcceptance Quality Limit');
  console.warn('WARN for C = 0 sampling plans\n');
  getSampleSize(argv.level, argv.lot, (err, sampleSize) => {
    // console.log(` A sample size of ${sampleSize} is recommended for a ${argv.lot} lot size at AQL ${argv.level}.`)
    console.log('    Lot Size --->', argv.lot);
    console.log('         AQL --->', argv.level);
    console.log(' Sample Size --->', sampleSize)
  })
}

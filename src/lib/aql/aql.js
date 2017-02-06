//const aqlTable = require('./aqlTable')

exports.command = 'aql <level|al> <lot|l>';
exports.desccribe = 'Get a sampling size for a lot at a AQL level';
exports.builder = {
  level: {
    describe: 'AQL level',
    demand: true,
    demand: 'A AQL level is required',
    alias: 'al'
  },
  lot: {
    describe: 'Lot size',
    demand: true,
    demand: 'A lot size is required',
    alias: 'l'
  }
};
exports.handler = (argv) => {


  console.log(`For a ${argv.lot} lot size at AQL ${argv.level},`)
  //console.log(`a sample size of ${sampleSize} is required.`)
}

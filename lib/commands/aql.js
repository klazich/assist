'use strict'

module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'aql <level> <lotSize>'
  cmd.desc = 'Get sample size with given AQL level and lot size'
  cmd.builder = {
    debug: {
      alias: 'd',
      describe: 'Output argv object'
    },
    expand: {
      alias: 'e',
      describe: 'Show AQL above and below as well'
    }
  }
  cmd.handler = function (argv) {

    const { level, lotSize, debug, expand } = argv
    const { _, log, aql: { getSampleSize } } = dep
    const { gray, green } = dep.colors
    const w = 5

    getSampleSize(level, lotSize)
      .then((result) => {

        let { request, lot, range } = result
        let { size, aql } = range.filter(e => e.result)[0]

        log.ger(null, `Lot Size:    ${_.padEnd(lotSize, 7)} ${gray(`(${lot})`)}`)
        log.ger(null, `AQL Level:   ${_.padEnd(level, 7)} ${gray(`(${aql})`)}`)
        log.ger(null, `Sample Size: ${green(size)}`)
        
        if (expand) {
          log.ger(null, '')
          range.forEach(o => {
            if(o.size === size) log.ger(null, `> ${_.padEnd(o.aql, 6)} ${o.size} <`)
            else log.ger(null, `  ${_.padEnd(o.aql, 6)} ${_.padEnd(o.size, 6)}`)
          })
        }


        if (debug) {
          log.ger('debug', 'argv > ' + JSON.stringify(argv, null, 2))
          log.ger('debug', 'result > ' + JSON.stringify(result, null, 2))
        }

      })
      .catch((e) => log.ger('error', e))
  }

  return cmd
}
module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'aql <level> <lotSize>'
  cmd.desc = 'Get sample size with given AQL level and lot size'
  cmd.builder = {
    debug: {
      describe: 'Output argv or returned object',
      array: true
    },
    expand: {
      alias: 'e',
      describe: 'Show AQL above and below as well'
    }
  }
  cmd.handler = function (argv) {
    const { level, lotSize, dr, debug, expand } = argv
    const { _, log, aql: { getSampleSize } } = dep
    const { gray, green } = dep.colors

    getSampleSize(level, lotSize)
      .then((result) => {
        let { lot, range } = result
        let { size, aql } = range.filter(e => e.result)[0]

        let _size = green(size)

        log.info(`Lot Size:    ${_.padEnd(lotSize, 6)} ${gray(`(${lot})`)}`)
        log.info(`AQL Level:   ${_.padEnd(level, 6)} ${gray(`(${aql})`)}`)
        log.info(`Sample Size: ${_size}`)

        if (expand) {
          log.info('')
          range.forEach(o => {
            if (o.aql === aql) log.info(`  ${_.padEnd(o.aql, 6)}> ${o.size} <`)
            else log.info(`  ${_.padEnd(o.aql, 6)}  ${_.padEnd(o.size, 6)}`)
          })
        }
        if (debug) {
          try {
            if (debug.includes('argv')) log.debug({argv})
            if (debug.includes('returned')) log.debug({result})
          } catch (e) {
            return Promise.reject(e)
          }
        }
      })
      .catch((e) => log.error(e))
  }

  return cmd
}

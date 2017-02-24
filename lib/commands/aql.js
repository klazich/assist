'use strict'

module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'aql <level> <lotSize>'
  cmd.desc = 'Get sample size with given AQL level and lot size'
  cmd.builder = {
    debug: {
      alias:    'd',
      describe: 'Output argv object'
    },
    expand: {
      alias: 'e',
      describe: 'Show AQL above and below as well'
    }
  }
  cmd.handler = function (argv) {

    const { level, lotSize, debug } = argv
    const { _, log, aql: { getSampleSize } } = dep
    const { gray, green } = dep.colors

    getSampleSize(level, lotSize)

      .then(({ sampleSize, aqlUsed, lotRange }) => {

        log.ger(undefined,
          `AQL Level:   ${_.padEnd(level, 6)  } ${gray(`(${aqlUsed})`)}`

        )
        log.ger(undefined, `Lot Size:    ${_.padEnd(lotSize, 6)} ${gray(`(${lotRange})`)}`)
        log.ger(undefined, `Sample Size: ${green(sampleSize)}`)

        if (debug) {
          log.ger('debug', 'argv:' + JSON.stringify(argv, null, 2))
        }

      })

      .catch((e) => log.ger('error', e))
  }

  return cmd
}
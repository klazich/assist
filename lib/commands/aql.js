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

    getSampleSize(level, lotSize)
      .then(({ sampleSize, aqlUsed, lotRange, lvlIdx, lotIdx }) => {

        if (expand) {
          log.ger('lvlIdx', lvlIdx)
          log.ger('lotIdx', lotIdx)
        }

        // let line1 = 'AQL Level:   ' + _.padEnd(level, 7) + _.padEnd(option1[0], 7) + _.padEnd(option2[0], 7)
        // let line2 = 'Lot Size:    ' + _.padEnd(lotSize, 7) + _.padEnd(option1[1], 7) + _.padEnd(option2[1], 7)
        // let line3 = 'Sample Size: ' + _.padEnd(green(sampleSize), 7) + _.padEnd(option1[2], 7) + _.padEnd(option2[2], 7)



        log.ger(undefined, `AQL Level:   ${_.padEnd(level, 6)} ${gray(`(${aqlUsed})`)}`)
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